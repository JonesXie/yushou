import router from '@/router/router.js' //引入路由配置
import store from '@/store/store.js' //引入vuex配置
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if(to.path === '/login'){
    store.commit('SET_FromToLogin',from.path)
  }
  next()
})

export default router