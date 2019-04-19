import axios from "axios";
import {Toast} from 'vant';

// 创建一个axios的实例
const service = axios.create({
  baseURL: 'https://www.fishmaimai.com', //默认请求地址
  // baseURL: process.env.BASE_API, //默认请求地址
  // withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
  timeout: 5000, // 请求时长
})

// 请求拦截
service.interceptors.request.use((config) => {

  return config
}, (error) => {
  // eslint-disable-next-line no-console
  Toast(error);
})

// 响应拦截
service.interceptors.response.use(
  response => {
    if (response.data.code === 1) {
      //成功 1
      return response;
    } else if (response.data.code === -1) {
      //未登录 -1
      Toast.fail('未登录')
    } else if (response.data.code === -2) {
      //无权限 -2
      Toast.fail('无权限')
    } else {
      //失败 0
      Toast.fail('出现错误:' + response.status)
    }

  },
  error => {
    // eslint-disable-next-line no-console
    Toast(error);
  })

export default service