import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setUpStore } from './store'

import 'normalize.css'
import '@/assets/css/index.less'
// import lrRequest from '@/service/index'

// 测试查看axios demo案例时打开
// import '@/service/axios-demo'

// 导入环境变量
// import { BASE_URL, TIME_OUT } from '@/service/request/config'

// 全局注册Element-plus，全局注册完之后还要在下面.use(ElementPlus)
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-loading.css'

// 导入所有Element Plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store).use(router).mount('#app')

// 遍历所有Element Plus图标组件添加进app全局组件中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 由于vuex中的数据是存储在内存中的，所以为了防止登录之后刷新页面，vuex中的数据被清空，
// 我们需要通过执行setUpStore这个函数，重新将本地中的token/userInfo/userMenus添加进vuex中
// 因为刷新页面，程序会重新找到main.ts这个项目入口文件并执行，所以将此方法在这里调用是最合适不过了
setUpStore()

// 使用环境变量
// console.log(BASE_URL, TIME_OUT)

// 请求中没有自己的拦截器：
// interface IDataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// lrRequest
//   .request<IDataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     responseType: 'json',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

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
