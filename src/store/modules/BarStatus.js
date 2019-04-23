const isBar = {
  state: {
    showBar: true,
    barActive:0
  },
  mutations: {
    SET_TABBAR: (state, opt) => {
      state.showBar = opt
    },
    SET_ACTIVE:(state,opt) =>{
      state.barActive = opt
    }
  },
  actions: {
    //获取状态更改
    ChangeStatus({commit}, opt) {
      commit('SET_TABBAR', opt);
    },
    ChangeActive({commit},opt){
      commit('SET_ACTIVE',opt)
    }
  }
}

export default isBar