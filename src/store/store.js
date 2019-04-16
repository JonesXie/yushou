import Vuex from 'vuex'
import Vue from 'vue'

import isBar from './modules/BarStatus'

Vue.use(Vuex); //注册到vue中

//使用模块化

export default new Vuex.Store({
  modules:{
    isBar
  }
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

