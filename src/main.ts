import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/service/axios-demo'

// 导入环境变量
// import { BASE_URL, TIME_OUT } from '@/service/request/config'

// 全局注册Element-plus，全局注册完之后还要在下面.use(ElementPlus)
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).mount('#app')

// 使用环境变量
// console.log(BASE_URL, TIME_OUT)
