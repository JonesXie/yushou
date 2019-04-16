import request from '@/config/AxiosConfig.js'
import qs from 'qs'

export function getMusic(data) {
  return request({
    url: '/musicBroadcasting',
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