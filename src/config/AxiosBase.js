import request from '@/config/AxiosConfig.js'
import qs from 'qs'
// post请求
export const post = function (url, data, isJson = false) {
  return request({
    url: url,
    method: 'POST',
    data: isJson ? data : qs.stringify(data) //判断是否是json格式，还是formData格式,默认不是Json格式
  })
}
export const get = function (url, data) {
  return request({
    url: url,
    method: 'GET',
    params: data //对数据进行params解析
  })
}