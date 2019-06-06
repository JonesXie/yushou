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

export function doLogin(data, isJson) {
  return post('/member/doLogin.api', data, isJson)
}