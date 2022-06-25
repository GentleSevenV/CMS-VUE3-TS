import { Module } from 'vuex'
import router from '@/router'
import { IRootState } from '../type'
import { ILoginState } from './type'
import { IAccount } from '@/service/login/type'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import LocalCache from '@/utils/cache'
import { mapMenutoRoutes } from '@/utils/mapmenu'
const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    // 定义一个changeToken方法用于修改（保存）发生请求之后获取的token
    changeToken: (state, token: string) => {
      state.token = token
    },
    // 定义一个changeUserInfo方法用于修改（保存）发生请求之后获取的userInfo
    changeUserInfo: (state, userInfo: any) => {
      state.userInfo = userInfo
    },
    // 定义一个changeUserMenus方法用于修改（保存）发生请求之后获取的userMenus
    changeUserMenus: (state, userMenus: any) => {
      state.userMenus = userMenus
      // 将登录之后通过roleId拿到的用户菜单userMenus通过mapMenutoRoutes函数映射到路由中去
      const routes = mapMenutoRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      console.log(routes)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.获取token
      // 执行accountLoginRequest函数去发送请求，通过当前账号密码获取token
      const accountLoginRes = await accountLoginRequest(payload)
      // console.log(accountLoginRes)
      // 拿到返回值后从中取出当前账号的id和token
      const { id, token } = accountLoginRes.data
      // 使用commit执行mutations中的changeToken方法去修改state中的token值
      commit('changeToken', token)
      // 由于后面其他请求都需要通过该账户获取的token进行发送请求，所以也要将该token存入本地缓存中，以便后续使用
      LocalCache.setCache('token', token)

      // 2.获取用户信息
      // 执行getUserInfoById函数去发送请求，通过id获取当前用户信息
      const userInfoRes = await getUserInfoById(id)
      // console.log(userInfoRes)
      // 从userInfoRes中拿到真正的userInfo数据
      const userInfo = userInfoRes.data
      // 使用commit执行mutations中的changeUserInfo方法去修改state中的userInfo值
      commit('changeUserInfo', userInfo)
      // 再将userInfo数据保存至本地缓存中
      LocalCache.setCache('userInfo', userInfo)

      // 3.获取当前用户角色菜单
      // 从userInfo中拿到roleId
      const roleId = userInfo.role.id
      // 执行getUserMenusByRoleId函数去发送请求，通过iroleId获取当前用户菜单
      const userMenusRes = await getUserMenusByRoleId(roleId)
      // console.log(userRoleMenuRes)
      // 从userMenusRes中拿到真正的userMenus数据
      const userMenus = userMenusRes.data
      // 使用commit执行mutations中的changeUserMenus方法去修改state中的userMenus值
      commit('changeUserMenus', userMenus)
      // 再将userMenus数据保存至本地缓存中
      LocalCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      router.push('/home')
    },

    // 由于vuex中的数据是存储在内存中的，所以为了防止刷新页面后，vuex中的数据被清空，我们需要重新将本地缓存中的token/userInfo/userMenus添加进vuex中
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default login
