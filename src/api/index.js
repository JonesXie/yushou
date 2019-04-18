import request from '@/config/AxiosConfig.js'
import qs from 'qs'

//首页-banner图
export function getBanner(data) {
  return request({
    url: '/info/findPicture.api',
    method: 'GET',
    params: data //对数据进行params解析
  })
}

//首页-发现好物接口
export function findGoods(data) {
  return request({
    url: '/goods/findGoods.api',
    method: 'GET',
    params: data //对数据进行params解析
  })
}

//首页-获取商品分类主题
export function selectCodeSubject(data) {
  return request({
    url: '/info/selectCodeSubject',
    method: 'GET',
    params: data //对数据进行params解析
  })
}
//首页-品牌主题
export function selectBrandSubject(data) {
  return request({
    url: '/info/selectBrandSubject',
    method: 'GET',
    params: data //对数据进行params解析
  })
}
//首页-获取活动列表
export function selectActivity(data) {
  return request({
    url: '/info/selectActivity',
    method: 'GET',
    params: data //对数据进行params解析
  })
}

export function getNews(data, isJson = true) {
  return request({
    url: '/getWangYiNews',
    method: 'POST',
    data: isJson ? data : qs.stringify(data) //判断是否是json格式，还是formData格式,默认是Json格式
  })
}