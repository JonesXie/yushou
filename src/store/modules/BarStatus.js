const isBar = {
  state: {
    showBar: true
  },
  mutations: {
    SET_ADDROPTIONS: (state, addrOptions) => {
      state.showBar = addrOptions
    }
  },
  actions: {
    //获取状态更改
    AddrOptionsUp({commit}, opt) {
      commit('SET_ADDROPTIONS', opt);
    }
  }
}

export default isBar