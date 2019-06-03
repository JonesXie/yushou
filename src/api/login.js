import request from '@/config/AxiosConfig.js'
import qs from 'qs'

//登录接口
export function doLogin(data, isJson = false) {
  return request({
    url: '/member/doLogin.api',
    method: 'POST',
    data: isJson ? data : qs.stringify(data) //判断是否是json格式，还是formData格式
  })
}

//注册
export function doRegister(data, isJson = false) {
  return request({
    url: '/member/doRegister.api',
    method: 'POST',
    data: isJson ? data : qs.stringify(data) //判断是否是json格式，还是formData格式
  })
}

//发送短信
export function toSendSms(data, isJson = false) {
  return request({
    url: '/member/toSendSms.api',
    method: 'POST',
    data: isJson ? data : qs.stringify(data) //判断是否是json格式，还是formData格式
  })
}
export function getBanner(data) {
  return request({
    url: '/member/doLogin.api',
    method: 'GET',
    params: data //对数据进行params解析
  })
}
