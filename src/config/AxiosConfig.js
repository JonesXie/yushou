import axios from "axios";
import {
  Toast
} from 'vant';
import router from '@/config/RouterConfig.js' //引入路由配置
import store from '@/store/store.js' //引入vuex配置

// 创建一个axios的实例
const service = axios.create({
  baseURL: 'https://www.fishmaimai.com', //默认请求地址
  // baseURL: process.env.BASE_API, //默认请求地址
  // withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
  timeout: 5000, // 请求时长
})
Toast.allowMultiple()

// 请求拦截
service.interceptors.request.use((config) => {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
  });
  config.headers.authorization = store.state.Token || localStorage.getItem('token')
  return config
}, (error) => {
  Toast.clear({
    clearAll: true
  });
  // eslint-disable-next-line no-console
  Toast(error);
})

// 响应拦截
service.interceptors.response.use(
  response => {
    Toast.clear({
      clearAll: true
    });
    if (response.data.code === 1) {
      //成功 1
      return response;
    } else if (response.data.code === -1) {
      //未登录 -1
      localStorage.setItem("token", null);
      Toast.fail(response.data.msg);
      router.push('/login')
    } else if (response.data.code === -2) {
      //无权限 -2
      Toast.fail('无权限')
    } else if (response.data.code === 0) {
      //无权限 -2
      Toast.fail(response.data.msg)
    } else {
      //失败 0
      if (`${response.config.url}`.includes('selectArticleDetaile')) {
        return response;
      }
    }
  },
  error => {
    // eslint-disable-next-line no-console
    Toast.clear({
      clearAll: true
    });
    alert(error);
  })

export default service