import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

interface IlrRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface LRRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IlrRequestInterceptors<T>

  // 扩展config属性，方便用户管理是否开启loading动画
  showLoading?: boolean
}

class LRRequest {
  instance: AxiosInstance
  interceptors?: IlrRequestInterceptors

  // 记录当前请求是否传递了showLoading的参数，以决定是否开启loading动画
  showLoading: boolean

  // 将loading动画保存起来，并且指定类型
  elloading?: LoadingInstance
  constructor(config: LRRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 判断config中showLoading是否有值，没有传值的话就默认为true，打开loading动画
    this.showLoading = config.showLoading ?? true

    // 每个axios实例自己独有的拦截器：请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 每个axios实例自己独有的拦截器：响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例中共有的拦截器：请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例共有的拦截器：请求拦截成功')

        // 判断showload是否有值，如果有值则打开loading动画
        if (this.showLoading) {
          this.elloading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log('所有的实例共有的拦截器：请求拦截失败')
        return err
      }
    )

    // 所有实例中共有的拦截器：响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例共有的拦截器：响应拦截成功')

        // 响应成功的时候需要关闭loading动画
        this.elloading?.close()

        // 处理响应错误信息方式一：通过data.returnCode
        // const data = res.data
        // switch (data.returnCode) {
        //   case '-1001':
        //     console.log('请求失败，错误信息')
        //     break
        //   case '-1002':
        //     console.log('请求失败，错误信息2')
        //     break
        //   default:
        //     return data
        // }

        // 注意：此处经过响应拦截之后将res.data当做res返回了，而不是完整的返回了res
        return res.data
      },
      (err) => {
        console.log('所有的实例共有的拦截器：响应拦截失败')

        // 响应失败的时候也需要关闭loading动画，否则就一直出现loading
        this.elloading?.close()
        // 处理响应错误信息方式二：通过err.response.status
        // switch (err.response.status) {
        //   case 404:
        //     console.log('404的错误')
        //     break
        //   case 401:
        //     console.log('401的错误')
        //     break
        //   default:
        //     return err
        // }
        return err
      }
    )
  }

  request<T>(config: LRRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 每个请求中的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 由于默认是true，是开启loading动画的，所以判断发送请求时的config.showLoading是否等于false，如果等于就将默认值改成false，关闭loading动画
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)

          // 每次请求完成之后，再重新将showloading值改成true，以便让下一次请求时也出现loading动画
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          // 每次请求完成之后，再重新将showloading值改成true，以便让下一次请求时也出现loading动画
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T>(config: LRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }

  post<T>(config: LRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }

  delete<T>(config: LRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }

  patch<T>(config: LRRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}

export default LRRequest
