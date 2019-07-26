import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouterMap = [
  //首页跳转
  {
    path: '/',
    // redirect: '/index'
    component: () => import('@/pages/Index/TheIndex.vue')
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
    path: '/promise',
    name: 'promise',
    component: () => import('@/pages/Index/ThePromise.vue')
  },
  {
    path: '/limitrelease',
    name: 'limitrelease',
    component: () => import('@/pages/Index/LimitRelease.vue')
  },
  {
    path: '/getcoupon',
    name: 'getcoupon',
    component: () => import('@/pages/Index/GetCoupon.vue')
  },
  {
    path: '/changetimer',
    name: 'changetimer',
    component: () => import('@/pages/Index/ChangeTimer.vue')
  },
  {
    path: '/earnmoney/:id',
    name: 'earnmoney',
    component: () => import('@/pages/Index/EarnMoney.vue')
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
    path: '/mycollection',
    name: 'mycollection',
    component: () => import('@/pages/Center/MyCollection.vue')
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import('@/pages/Center/TheQuestion.vue')
  },
  {
    path: '/invitation/:code/:phone',
    name: 'invitation',
    component: () => import('@/pages/Center/MyInvitation.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/Center/TheAbout.vue')
  },
  //收藏
  //订单
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
  //下单前
  {
    path: '/orderconfirm',
    name: 'orderconfirm',
    component: () => import('@/pages/Order/OrderConfirm.vue')
  },
  //订单优惠券
  {
    path: '/ordercoupon/:goodsId',
    name: 'ordercoupon',
    component: () => import('@/pages/Order/OrderCoupon.vue')
  },
  //支付
  {
    path: '/orderpay/:orderId',
    name: 'orderpay',
    component: () => import('@/pages/Order/OrderPay.vue')
  },
  {
    path: '/paysuccess/:payType/:price/:needID',
    name: 'paysuccess',
    component: () => import('@/pages/Order/PaySuccess.vue')
  },
  {
    path: '/editorconfig',
    name: 'editorconfig',
    component: () => import('@/pages/Order/EditorConfig.vue')
  },
  //挂卖
  {
    path: '/guadetail/:orderId',
    name: 'guadetail',
    component: () => import('@/pages/Order/GuaDetail.vue')
  },
  {
    path: '/guaconfirm/:orderId',
    name: 'guaconfirm',
    component: () => import('@/pages/Order/GuaConfirm.vue')
  },
  //物流
  {
    path: '/logistics/:orderId',
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
    path: '/goodstype/:id',
    name: 'goodstype',
    component: () => import('@/pages/Goods/GoodsType.vue')
  },
  //商品评论列表
  {
    path: '/judgelist/:goodsId',
    name: 'judgelist',
    component: () => import('@/pages/Goods/JudgeList.vue')
  },
  //商品评论详情
  {
    path: '/judgedetail/:id',
    name: 'judgedetail',
    component: () => import('@/pages/Goods/JudgeDetail.vue')
  },
  //活动
  {
    path: '/actions',
    name: 'actions',
    component: () => import('@/pages/Components/TheActions.vue')
  },
  //分销
  {
    path: '/distribution',
    name: 'distribution',
    component: () => import('@/pages/Distribute/TheDistribute.vue')
  },
  {
    path: '/applydistribution/:actived',
    name: 'applydistribute',
    component: () => import('@/pages/Distribute/ApplyDistribute.vue')
  },
  {
    path: '/applyinfo/:type',
    name: 'applyinfo',
    component: () => import('@/pages/Distribute/ApplyInfo.vue')
  },
  //店长钱包
  {
    path: '/onwallet',
    name: 'onwallet',
    component: () => import('@/pages/Distribute/OnWallet.vue')
  },
  {
    path: '/offwallet',
    name: 'offwallet',
    component: () => import('@/pages/Distribute/OffWallet.vue')
  },
  //提现
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('@/pages/Distribute/WithDraw.vue')
  },
  //线上店长
  {
    path: '/onlineshopowner',
    name: 'onlineshopowner',
    component: () => import('@/pages/Distribute/OnlineShopowner.vue')
  },
  {
    path: '/salermember',
    name: 'salermember',
    component: () => import('@/pages/Distribute/SalerManage.vue')
  },
  //报表
  {
    path: '/reportform',
    name: 'reportform',
    component: () => import('@/pages/Distribute/ReportForm.vue')
  },
  //客户管理
  {
    path: '/customermanage',
    name: 'customermanage',
    component: () => import('@/pages/Distribute/CustomerManage.vue')
  },
  //订单管理
  {
    path: '/distributeorder',
    name: 'distributeorder',
    component: () => import('@/pages/Distribute/DistributeOrder.vue')
  },
  {
    path: '/offdistributeorder',
    name: 'offdistributeorder',
    component: () => import('@/pages/Distribute/OffDistributeOrder.vue')
  },
  //订单明细
  {
    path: '/distributeorderdetail/:userId',
    name: 'distributeorderdetail',
    component: () => import('@/pages/Distribute/DistributeOrderDetail.vue')
  },
  //店长审核
  {
    path: '/thecheck',
    name: 'thecheck',
    component: () => import('@/pages/Distribute/TheCheck.vue')
  },
  //商品标价签下载
  {
    path: '/labeldownload',
    name: 'labeldownload',
    component: () => import('@/pages/Distribute/LabelDownload.vue')
  },
  // 设置404页面
  {
    path: '/404',
    component: () => import('@/pages/404/404.vue')
  },
  {
    path: '*',
    component: () => import('@/pages/404/404.vue')
  }
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }), //滚动到顶部
  routes: RouterMap
})