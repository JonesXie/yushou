import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouterMap = [
  //首页跳转
  {
    path: '/',
    redirect: '/index'
  },
  //登录注册
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/TheLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/Login/TheRegister.vue')
  },
  //index
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/Index/TheIndex.vue')
  },
  {
    path: '/getcoupon',
    name: 'getcoupon',
    component: () => import('@/pages/Index/GetCoupon.vue')
  },
  {
    path: '/thesearch',
    name: 'thesearch',
    component: () => import('@/pages/Public/TheSearch.vue')
  },
  {
    path: '/thenotices',
    name: 'thenotices',
    component: () => import('@/pages/Index/TheNotices.vue')
  },
  {
    path: '/noticedetail',
    name: 'noticedetail',
    component: () => import('@/pages/Index/NoticeDetail.vue')
  },
  //严选
  {
    path: '/yanxuan',
    name: 'yanxuan',
    component: () => import('@/pages/Yanxuan/YanXuan.vue')
  },
  {
    path: '/yanxuanlist',
    name: 'yanxuanlist',
    component: () => import('@/pages/Yanxuan/YanxuanList.vue')
  },
  {
    path: '/articledetail/:id',
    name: 'articledetail',
    component: () => import('@/pages/Yanxuan/ArticleDetail.vue')
  },
  //分类
  {
    path: "/thetype",
    component: () => import('@/pages/Type/TheType.vue')
  },
  //我的
  {
    path: '/center',
    name: 'center',
    component: () => import('@/pages/Center/TheCenter.vue')
  },
  //设置
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/Center/TheSetting.vue')
  },
  {
    path: '/fixpassword',
    name: 'fixpassword',
    component: () => import('@/pages/Center/FixPassword.vue')
  },
  {
    path: '/security',
    name: 'security',
    component: () => import('@/pages/Center/SecuritySetting.vue')
  },
  {
    path: '/setpay/:id',
    name: 'setpay',
    component: () => import('@/pages/Center/SetPay.vue')
  },
  //钱包
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('@/pages/Wallet/TheWallet.vue')
  },
  {
    path: '/walletdetail',
    name: 'walletdetail',
    component: () => import('@/pages/Wallet/WalletDetail.vue')
  },
  {
    path: '/walletout',
    name: 'walletout',
    component: () => import('@/pages/Wallet/WalletOut.vue')
  },
  {
    path: '/couponcenter',
    name: 'couponcenter',
    component: () => import('@/pages/Center/CouponCenter.vue')
  },
  {
    path: '/mysales',
    name: 'mysales',
    component: () => import('@/pages/Center/MySales.vue')
  },
  //地址
  {
    path: '/mysite',
    name: 'mysite',
    component: () => import('@/pages/Site/MySite.vue')
  },
  {
    path: '/setsite',
    name: 'setsite',
    component: () => import('@/pages/Site/SetSite.vue')
  },

  {
    path: '/myorder/:active',
    name: 'myorder',
    component: () => import('@/pages/Order/MyOrder.vue')
  },
  {
    path: '/orderdetail/:id',
    name: 'orderdetail',
    component: () => import('@/pages/Order/OrderDetail.vue')
  },
  {
    path: '/orderconfirm',
    name: 'orderconfirm',
    component: () => import('@/pages/Order/OrderConfirm.vue')
  },
  {
    path: '/orderpay',
    name: 'orderpay',
    component: () => import('@/pages/Order/OrderPay.vue')
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/pages/Order/PaySuccess.vue')
  },
  //挂卖
  {
    path: '/guadetail',
    name: 'guadetail',
    component: () => import('@/pages/Order/GuaDetail.vue')
  },
  {
    path: '/guaconfirm',
    name: 'guaconfirm',
    component: () => import('@/pages/Order/GuaConfirm.vue')
  },
  //物流
  {
    path: '/logistics',
    name: 'logistics',
    component: () => import('@/pages/Order/TheLogistics.vue')
  },
  //商品
  {
    path: '/goods/:id',
    name: 'goods',
    component: () => import('@/pages/Goods/TheGoods.vue')
  },
  //商品分类
  {
    path: '/goodstype/id=:id&codeName=:codeName',
    name: 'goodstype',
    component: () => import('@/pages/Goods/GoodsType.vue')
  },
  //活动
  {
    path: '/actions',
    name: 'actions',
    component: () => import('@/pages/Components/TheActions.vue')
  },
  // 设置404页面
  {
    path: '/404',
    component: () => import('@/pages/404/404.vue')
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