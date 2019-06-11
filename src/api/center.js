import {
  post,
  get,
} from '@/config/AxiosBase.js'

// 用户-获取用户基本信息
export function getMember(data) {
  return get('/member/getMember.api', data)
}




export function doLogin(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}