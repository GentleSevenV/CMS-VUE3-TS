import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'Lilei',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

// 通过在main.ts中调用setUpStore此函数，则通过store.dispatch去执行子模块（login模块）action中的loadLocalLogin，去将本地缓存中的token/userInfo/userMenus添加进vuex中
export function setUpStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
