import Vuex from 'vuex'
import Vue from 'vue'

import isBar from './modules/BarStatus'
import isOrder from './modules/OrderInfo'
import {
  getWXAppId
} from "@/api/login.js";

Vue.use(Vuex); //注册到vue中

const state = {
  stickTop: 0,
  fromToLogin: "/index",
  Token: null,
  wxData: null,
};
const mutations = {
  SET_STICKTOP: (state, val) => {
    state.stickTop = val
  },
  SET_FromToLogin: (state, val) => {
    state.fromToLogin = val
  },
  SET_Token: (state, val) => {
    state.Token = val
  },
  SET_WxData: (state, val) => {
    state.wxData = val
  }
};
const actions = {
  ChangeStickTop: ({
    commit
  }, val) => {
    commit('SET_STICKTOP', val)
  },
  setWxData: ({
    commit
  }, val) => {
    commit('SET_WxData', val)
  },
  //微信登录
  getWX: () => {
    getWXAppId().then(({
      data
    }) => {
      if (data.code === 1) {
        localStorage.setItem("openId", "www.fishmaimai.com");
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
          data.data.appId
        }&redirect_uri=${
          data.data.url
        }/index&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      }
    });
  }
};
//使用模块化
export default new Vuex.Store({
  modules: {
    isBar,
    isOrder
  },
  state,
  mutations,
  actions,
})

// //不使用模块化
// const  state = {};
// const  mutations = {};
// const  actions = {};
// const  getters = {};
// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
//   getters
// });