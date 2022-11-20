import request from '@/config/axios'
import type { UserType } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({
    url: '/admin/login', data: {
      tel: data.username,
      password: data.password,
    }
  })
}

export const getUserInfoApi = (): Promise<IResponse<UserType>> => {
  return request.get({ url: '/admin/userInfo'})
}

// export const loginOutApi = (): Promise<IResponse> => {
//   return request.get({ url: '/user/loginOut' })
// }

// export const getRoleApi = (params: RoleParams): Promise<IResponse<RouteConfig[]>> => {
//   return request.get({ url: '/role/list', params })
// }