import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局注册Element-plus，全局注册完之后还要在下面.use(ElementPlus)
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).mount('#app')
