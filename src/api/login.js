import {
  post,
  get
} from '@/config/AxiosBase.js'

//登录接口
export function doLogin(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}
//注册
export function doRegister(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}
//发送短信
export function toSendSms(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}

export function getBanner(data) {
  return get('/member/doRegister.api', data)
}