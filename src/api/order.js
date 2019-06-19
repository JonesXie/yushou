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


// 订单--提交订单
export function doSubmitOrder(data, isJson) {
  return post('/order/doSubmitOrder.api', data, isJson)
}

//订单-提交支付订单
export function toPayOrder(data, isJson) {
  return post('/order/toPayOrder.api', data, isJson)
}

//订单-余额支付
export function balancePay(data, isJson) {
  return post('/order/balancePay.api', data, isJson)
}

//订单-微信或支付支付
export function doPayOrder(data, isJson) {
  return post('/order/doPayOrder.api', data, isJson)
}