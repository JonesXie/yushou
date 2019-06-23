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

//订单-取消待支付订单
export function doCancelOrder(data, isJson) {
  return post('/order/doCancelOrder.api', data, isJson)
}

// 提醒发货
export function toConsignmentReminding(data) {
  return get('/order/toConsignmentReminding.api', data)
}

//订单-订单收货
export function doTakeDeliveryr(data, isJson) {
  return post('/order/doTakeDeliveryr.api', data, isJson)
}

//订单-获取订单地址信息
export function selectOrderAddress(data, isJson) {
  return post('/api/order/selectOrderAddress', data, isJson)
}

//订单-修改订单身份证号码
export function changeOrderIdentity(data, isJson) {
  return post('/api/order/changeOrderIdentity', data, isJson)
}

//订单-获取商品挂卖订单列表
export function findGoodsSellOrderPage(data, isJson) {
  return post('/order/findGoodsSellOrderPage.api', data, isJson)
}

//订单-确认购买挂卖订单
export function toComfirmSellOrder(data, isJson) {
  return post('/order/toComfirmSellOrder.api', data, isJson)
}

//订单-生成挂卖订单
export function doSubmitSellOrder(data, isJson) {
  return post('/order/doSubmitSellOrder.api', data, isJson)
}

//用户-查询身份信息页面
export function selectUserCardPage(data, isJson) {
  return post('/api/member/selectUserCardPage', data, isJson)
}

//订单-订单绑定身份信息
export function fillUpOrderIdentity(data, isJson) {
  return post('/api/order/fillUpOrderIdentity', data, isJson)
}

//用户-保存身份证信息
export function saveUserCard(data, isJson) {
  return post('/api/member/saveUserCard', data, isJson)
}

//订单-获取订单物流信息
export function selectOrderLogistics(data, isJson) {
  return post('/api/order/selectOrderLogistics', data, isJson)
}