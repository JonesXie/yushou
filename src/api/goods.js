import {
  post,
  get,
} from '@/config/AxiosBase.js'

// 商品-商品详情
export function findGoodsDetail(data) {
  return get('/goods/findGoodsDetail.api', data)
}

//商品-获取评论数量
export function selectCommentNum(data, isJson) {
  return post('/api/comment/selectCommentNum', data, isJson)
}

// 商品-商品评论列表
export function selectCommentPage(data) {
  return get('/api/comment/selectCommentPage', data)
}

//商品-获取单个评论内容
export function selectComment(data, isJson) {
  return post('/api/comment/selectComment', data, isJson)
}

//商品-填写商品评论
export function insertComment(data, isJson) {
  return post('/api/comment/insertComment', data, isJson)
}