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
  {
    path: '/getcoupon',
    name: 'getcoupon',
    component: resolve => {
      require(['@/pages/Index/GetCoupon.vue'], resolve);
    }
  },
  {
    path: '/thesearch',
    name: 'thesearch',
    component: resolve => {
      require(['@/pages/Public/TheSearch.vue'], resolve);
    }
  },
  {
    path: '/thenotices',
    name: 'thenotices',
    component: resolve => {
      require(['@/pages/Index/TheNotices.vue'], resolve);
    }
  },
  {
    path: '/noticedetail',
    name: 'noticedetail',
    component: resolve => {
      require(['@/pages/Index/NoticeDetail.vue'], resolve);
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