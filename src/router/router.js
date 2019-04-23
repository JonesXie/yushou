import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouterMap = [{
    path: '/',
    redirect: '/index'
  },
  //登录注册
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      require(['@/pages/Login/TheLogin.vue'], resolve);
    }
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => {
      require(['@/pages/Login/TheRegister.vue'], resolve);
    }
  },
  //index
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
  //严选
  {
    path: '/yanxuan',
    name: 'yanxuan',
    component: resolve => {
      require(['@/pages/Yanxuan/YanXuan.vue'], resolve);
    }
  },
  //分类
  {
    path: "/thetype",
    component: resolve => {
      require(['@/pages/Type/TheType.vue'], resolve);
    }
  },
  //我的
  {
    path: '/center',
    name: 'center',
    component: resolve => {
      require(['@/pages/Center/TheCenter.vue'], resolve);
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