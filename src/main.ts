import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lrRequest from '@/service/index'

// 测试查看axios demo案例时打开
// import '@/service/axios-demo'

// 导入环境变量
// import { BASE_URL, TIME_OUT } from '@/service/request/config'

// 全局注册Element-plus，全局注册完之后还要在下面.use(ElementPlus)
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-loading.css'

createApp(App).use(store).use(router).mount('#app')

// 使用环境变量
// console.log(BASE_URL, TIME_OUT)

// 请求中没有自己的拦截器：
interface IDataType {
  data: any
  returnCode: string
  success: boolean
}

lrRequest
  .request<IDataType>({
    url: '/home/multidata',
    method: 'GET',
    responseType: 'json',
    showLoading: true
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

// 请求中有自己的拦截器：
// lrRequest.request({
//   url: '/home/multidata',
//   method: 'get',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的res')
//       return res
//     }
//   }
// })
