import router from '@/router/router.js' //引入路由配置
import store from '@/store/store.js' //引入vuex配置
import {
  notNull
} from "@/layout/methods.js"
router.beforeEach((to, from, next) => {
  // if (!notNull(localStorage.getItem("openId"))) {
  //   store.dispatch("getWX");
  // }
  if (to.path === '/login' || to.path === '/register') {
    if (notNull(localStorage.getItem('token'))) {
      store.commit('SET_FromToLogin', from.path)
    } else {
      router.push('/index')
    }
  }
  // if (`${to.path}`.includes('goods')) {
  //   store.commit('setTogoods', from.path)
  // }
  next()
})

export default router