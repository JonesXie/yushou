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

export function doLogin(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}