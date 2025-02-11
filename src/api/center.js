import {
  post,
  get,
} from '@/config/AxiosBase.js'

// 用户-获取用户基本信息
export function getMember(data) {
  return get('/member/getMember.api', data)
}

//用户-获取地址列表-分页
export function findAddress(data) {
  return get('/member/findAddress.api', data)
}

//用户-设置默认地址
export function doDefaultAddress(data, isJson) {
  return post('/member/doDefaultAddress.api', data, isJson)
}

//用户-保存地址
export function doAddAddress(data, isJson) {
  return post('/member/doAddAddress.api', data, isJson)
}

//用户-获取用户单个地址信息
export function getAddress(data) {
  return get('/member/getAddress.api', data)
}

//用户-修改地址
export function doUpdateAddress(data, isJson) {
  return post('/member/doUpdateAddress.api', data, isJson)
}

//用户-删除地址
export function doDelAddress(data, isJson) {
  return post('/member/doDelAddress.api', data, isJson)
}

//用户-忘记密码
export function doForgetPassword(data, isJson) {
  return post('/member/doForgetPassword.api', data, isJson)
}

// 用户-修改支付密码
export function changePayPassword(data, isJson) {
  return post('/member/changePayPassword.api', data, isJson)
}

//用户-消费记录
export function findUserAccountRecord(data) {
  return get('/member/findUserAccountRecord.api', data)
}

//用户-提现
export function doPresent(data, isJson) {
  return post('/member/doPresent.api', data, isJson)
}

//用户-用户优惠券列表-分页
export function findUserCoupon(data) {
  return get('/member/findUserCoupon.api', data)
}

//用户-转赠优惠券
export function donationCoupon(data, isJson) {
  return post('/member/donationCoupon.api', data, isJson)
}

//订单-挂卖订单列表-分页
export function findMySellOrder(data) {
  return get('/order/findMySellOrder.api', data)
}

//订单-设置挂卖订单折扣
export function doUpdateOrderProfitDiscount(data, isJson) {
  return post('/order/doUpdateOrderProfitDiscount.api', data, isJson)
}

//订单-订单-申请挂卖
export function doUpdateOrderSell(data, isJson) {
  return post('/order/doUpdateOrderSell.api', data, isJson)
}

//商品-我的收藏列表
export function findUserCollect(data, isJson) {
  return post('/member/findUserCollect.api', data, isJson)
}

//用户-常见问题列表
export function findCommonProblem(data) {
  return get('/info/findCommonProblem.api', data)
}

//用户-邀请好友列表
export function findMyInviter(data) {
  return get('/member/findMyInviter.api', data)
}