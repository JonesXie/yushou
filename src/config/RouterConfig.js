import router from '@/router/router.js' //引入路由配置

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  next()
})

export default router