import router from '@/router/router.js' //引入路由配置
import store from '@/store/store.js' //引入vuex配置
import {
  notNull
} from "@/layout/methods.js"
router.beforeEach((to, from, next) => {
  //记录通过分享获取到的distributorId
  if (`${to.path}`.includes('/goods/')) {
    if (notNull(to.query.distributorId)) {
      sessionStorage.setItem("distributorId", to.query.distributorId)
    }
  }
  // 从首页获取 distributorId
  if (`${window.location.href}`.includes('distributorId') && from.path === '/') {
    if (notNull(to.query.distributorId)) {
      sessionStorage.setItem("distributorId", to.query.distributorId)
    }
  }
  // 上线时放开注释
  if (!notNull(localStorage.getItem("openId"))) {
    let domain = document.domain || window.location.host
    sessionStorage.setItem("enterURL", `${window.location.href}`.split(domain)[1])
    store.dispatch("getWX");
  }
  //兼容WX ios首次进入
  if (!notNull(store.state.wxURL)) {
    store.commit('SET_WxURL', window.location.href)
    // sessionStorage.setItem("firstURL", window.location.href)
  }
  //记录去登录的url，登陆后返回
  if (to.path === '/login') {
    if (!`${from.path}`.includes('/registor')) {
      store.commit('SET_FromToLogin', from.path)
    }
  }
  if (to.path === '/login' || to.path === '/registor') {
    if (notNull(sessionStorage.getItem("isLogin"))) {
      router.replace({
        path: '/'
      })
    }
  }
  next()
})

export default router