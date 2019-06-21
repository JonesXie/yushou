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
  return post('/member/doRegister.api', data, isJson)
}
//发送短信
export function toSendSms(data, isJson) {
  return post('/member/toSendSms.api', data, isJson)
}

//获取微信重定向
export function wxLoginPrepare(data) {
  return get('/api/member/wxLoginPrepare', data)
}