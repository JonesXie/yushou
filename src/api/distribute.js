import {
  post,
  get,
} from '@/config/AxiosBase.js'

// 分销-查询自己的或自己名下的分销店铺信息
export function selectDistributor(data) {
  return get('/api/distributor/selectDistributor', data)
}


//分销-申请成为店长
export function saveUserDistributorApply(data, isJson) {
  return post('/api/distributor/saveUserDistributorApply', data, isJson)
}