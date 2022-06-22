export interface IAccount {
  name: string
  password: string
}

export interface IAccountLoginRes<T = any> {
  code: number
  data: T
}

export interface IAccountLoginData {
  id: number
  name: string
  token: string
}
