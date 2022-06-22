import lrRequest from '../index'
import { IAccount, IAccountLoginRes, IAccountLoginData } from './type'

enum LoginApi {
  AccountLoginUrl = '/login',
  GetUserInfoUrl = '/users/',
  GetRoleMenuUrl = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return lrRequest.post<IAccountLoginRes<IAccountLoginData>>({
    url: LoginApi.AccountLoginUrl,
    data: account
  })
}

export function getUserInfoById(id: number) {
  return lrRequest.get<IAccountLoginRes>({
    url: LoginApi.GetUserInfoUrl + id
  })
}

export function getUserMenusByRoleId(roleId: number) {
  return lrRequest.get<IAccountLoginRes>({
    url: LoginApi.GetRoleMenuUrl + roleId + '/menu'
  })
}
