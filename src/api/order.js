import {
  post,
  get,
} from '@/config/AxiosBase.js'

// 订单-用户个人订单列表-分页
export function findMyOrderPage(data) {
  return get('/order/findMyOrderPage.api', data)
}

// 订单-订单详情
export function toOrderDetail(data) {
  return get('/order/toOrderDetail.api', data)
}

// 订单-微信或支付支付
export function doPayOrder(data) {
  return get('/order/doPayOrder.api', data)
}


export function doLogin(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}