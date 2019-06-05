import {
  post,
  get
} from '@/config/AxiosBase.js'

//首页-banner图
export function getBanner(data) {
  return get('/info/findPicture.api', data)
}

//首页-发现好物接口
export function findGoods(data) {
  return get('/goods/findGoods.api', data)
}

//首页-获取商品分类主题
export function selectCodeSubject(data) {
  return get('/info/selectCodeSubject', data)
}

//首页-品牌主题
export function selectBrandSubject(data) {
  return get('/info/selectBrandSubject', data)
}

//首页-获取活动列表
export function selectActivity(data) {
  return get('/info/selectActivity', data)
}

//商品-获取商品列表 
export function findAllGoods(data) {
  return get('/goods/findAllGoods.api', data)
}

export function doLogin(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}
