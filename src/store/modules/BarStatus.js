const isBar = {
  state: {
    showBar: true
  },
  mutations: {
    SET_TABBAR: (state, opt) => {
      state.showBar = opt
    }
  },
  actions: {
    //获取状态更改
    ChangeStatus({commit}, opt) {
      commit('SET_TABBAR', opt);
    }
  }
}

export default isBar