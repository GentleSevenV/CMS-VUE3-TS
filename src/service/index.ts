import LRRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const lrRequest = new LRRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 每个axios实例自己独有的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 添加token到config中
      // const token = ''
      // if (token && config.headers) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      console.log('每个axios实例自己独有的拦截器：请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('每个axios实例自己独有的拦截器：请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('每个axios实例自己独有的拦截器：响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('每个axios实例自己独有的拦截器：响应失败的拦截')
      return err
    }
  }
})
export default lrRequest
