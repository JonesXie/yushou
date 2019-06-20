import Vuex from 'vuex'
import Vue from 'vue'

import isBar from './modules/BarStatus'
import isOrder from './modules/OrderInfo'

Vue.use(Vuex); //注册到vue中

const state = {
  stickTop: 0,
  fromToLogin: "/index",
  Token: null
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
  }
};
const actions = {
  ChangeStickTop: ({
    commit
  }, val) => {
    commit('SET_STICKTOP', val)
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