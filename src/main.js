import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'; //引入rem自适应
import router from '@/config/RouterConfig.js' //引入路由配置
import store from '@/store/store.js' //引入vuex配置
import '@/assets/css/reset.css' //引入重置浏览器样式
import {
  notNull
} from "@/layout/methods.js"; //非空验证
import {
  Toast,
  Notify
} from 'vant'; //全局引入提示
Vue.config.productionTip = false

Vue.use(Toast)
Vue.use(Notify)

Vue.directive('validtel', {
  // 当绑定元素插入到 DOM 中。
  bind: function (el) {
    el.handler = function () {
      let reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
      if (notNull(el.value)) {
        if (!reg.test(el.value)) {
          Toast('手机号码不正确')
          el.value = null
        }
      } else {
        Toast('请填写手机号码')
      }

    };
    el.addEventListener('blur', el.handler);
  },
  //解除绑定
  unbind: function (el) {
    el.removeEventListener('blur', el.handler);
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')