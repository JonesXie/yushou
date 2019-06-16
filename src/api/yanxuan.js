import {
  post,
  get,
} from '@/config/AxiosBase.js'
//严选-文章分类数据
export function selectArticleClassifyList(data) {
  return get('/api/articleClassify/selectArticleClassifyList', data)
}
//严选-文章推荐列表
export function selectRecommendArticlePage(data) {
  return get('/api/article/selectRecommendArticlePage', data)
}
//严选-获取文章列表  + 严选-文章回复列表
export function selectArticlePage(data) {
  return get('/api/article/selectArticlePage', data)
}
//商品-评论点赞
export function zan(data, isJson) {
  return post('/api/comment/zan', data, isJson)
}

//用户-获取文章html
export function selectArticleDetaile(data) {
  return get('/admin/article/selectArticleDetaile', data)
}

//严选-获取文章详情
export function selectArticle(data) {
  return get('/api/article/selectArticle', data)
}

//商品-商品收藏
export function doAddCollect(data,isJson) {
  return post('/member/doAddCollect.api', data,isJson)
}

//商品-取消商品收藏
export function doDelUserCollect(data,isJson) {
  return post('/member/doDelUserCollect.api', data,isJson)
}
