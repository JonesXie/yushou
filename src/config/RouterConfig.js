import router from '@/router/router.js' //引入路由配置
import store from '@/store/store.js' //引入vuex配置
import {
  // eslint-disable-next-line no-unused-vars
  notNull
} from "@/layout/methods.js"
router.beforeEach((to, from, next) => {
  if (!notNull(sessionStorage.getItem('firstURL'))) {
    if (to.path === "/index") {
      sessionStorage.setItem("firstURL", `${window.location.href}index`)
    } else {
      sessionStorage.setItem("firstURL", window.location.href)
    }
  }
  //上线时放开注释
  // if (!notNull(localStorage.getItem("openId"))) {
  //   store.dispatch("getWX");
  // }
  if (to.path === '/login') {
    store.commit('SET_FromToLogin', from.path)
  }
  // if (`${to.path}`.includes('goods')) {
  //   store.commit('setTogoods', from.path)
  // }
  next()
})

export default router