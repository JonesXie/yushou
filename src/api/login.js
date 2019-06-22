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

//获取微信appid
export function getWXAppId(data) {
  return get('/api/member/getWXAppId?type=2', data)
}

// 通过code获取token
export function getWXAccessToken(data) {
  return get('/api/member/getWXAccessToken', data)
}

//用户三方注册
export function thirdlyRegister(data, isJson) {
  return post('/member/thirdlyRegister.api', data, isJson)
}