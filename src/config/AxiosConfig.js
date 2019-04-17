import axios from "axios";


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
  console.log('beforeErr' +error)
})

// 响应拦截
service.interceptors.response.use(
  response => response,
  error => {
     // eslint-disable-next-line no-console
    console.log('backErr' + error) // for debug
  })

export default service