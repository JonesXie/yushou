import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouterMap = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => {
      require(['@/pages/Index/TheIndex.vue'], resolve);
    }
  },



  // 设置404页面
  {
    path: '/404',
    component: resolve => {
      require(['@/pages/404/404.vue'], resolve);
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }), //滚动到顶部
  routes: RouterMap
})