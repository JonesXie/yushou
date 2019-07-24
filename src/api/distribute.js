import {
  post,
  get,
} from '@/config/AxiosBase.js'

// 分销-查询自己的或自己名下的分销店铺信息
export function selectDistributor(data) {
  return get('/api/distributor/selectDistributor', data)
}

//分销-获取申请成为线下店长数量
export function selectUserDistributorApplyNum(data, isJson) {
  return post('/api/distributor/selectUserDistributorApplyNum', data, isJson)
}

//分销-申请成为店长
export function saveUserDistributorApply(data, isJson) {
  return post('/api/distributor/saveUserDistributorApply', data, isJson)
}

//分销-分销收入列表-分页
export function selectUserDistributorBill(data, isJson) {
  return post('/api/distributor/selectUserDistributorBill', data, isJson)
}

//分销-分销报表-分页
export function selectUserDistributorReport(data, isJson) {
  return post('/api/distributor/selectUserDistributorReport', data, isJson)
}

//分销-店长提现
export function withdrawDeposit(data, isJson) {
  return post('/api/distributor/withdrawDeposit', data, isJson)
}

//分销-线下店长审核线上店长列表-分页
export function selectUserDistributorApply(data, isJson) {
  return post('/api/distributor/selectUserDistributorApply', data, isJson)
}

//分销-线下店长拒绝成为线上店长申请
export function rejectUserDistributorApply(data, isJson) {
  return post('/api/distributor/rejectUserDistributorApply', data, isJson)
}

//分销-创建或修改下级店铺
export function saveDistributor(data, isJson) {
  return post('/api/distributor/saveDistributor', data, isJson)
}

//分销-查询上级或下级分销店铺
export function selectDistributorCodeList(data, isJson) {
  return post('/api/distributor/selectDistributorCodeList', data, isJson)
}

//分销-获取邀请用户列表-分页
export function selectDistributorBindUser(data, isJson) {
  return post('/api/distributor/selectDistributorBindUser', data, isJson)
}

//分销-获取分销订单-分页
export function selectDistributorOrder(data, isJson) {
  return post('/api/distributor/selectDistributorOrder', data, isJson)
}

//分销-线上店长注销
export function cancelUserDistributorCode(data, isJson) {
  return post('/api/distributor/cancelUserDistributorCode', data, isJson)
}

//分销-提现提示
export function withdrawalPrompt(data, isJson) {
  return post('/api/distributor/withdrawalPrompt', data, isJson)
}

//分销-获取分销商品下载地址-列表
export function selectYmWaitQRCodeZipFilesPage(data, isJson) {
  return post('/goods/selectYmWaitQRCodeZipFilesPage', data, isJson)
}
//分销-提交请求获取全部商品标价牌
export function createProductQRCode(data, isJson) {
  return post('/goods/createProductQRCode', data, isJson)
}