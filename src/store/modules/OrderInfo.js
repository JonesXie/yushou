const isOrder = {
  state: {
    confirmInfo: null,
    toSite: false,
    fromSite: false,
    siteData: null,
    toGoods: "/"
  },
  mutations: {
    SET_CONfIRMINFO: (state, opt) => {
      state.confirmInfo = opt
    },
    SET_TOSITE: (state, opt) => {
      state.toSite = opt
    },
    SET_FROMSITE: (state, opt) => {
      state.fromSite = opt
    },
    SET_SITEDATA: (state, opt) => {
      state.siteData = opt
    },
    SET_TOGOODS: (state, opt) => {
      state.toGoods = opt
    },
  },
  actions: {
    setInfo({
      commit
    }, opt) {
      commit('SET_CONfIRMINFO', opt);
    },
    setTosite({
      commit
    }, opt) {
      commit('SET_TOSITE', opt);
    },
    setFromsite({
      commit
    }, opt) {
      commit('SET_FROMSITE', opt);
    },
    setSitedata({
      commit
    }, opt) {
      commit('SET_SITEDATA', opt);
    },
    setTogoods({
      commit
    }, opt) {
      commit('SET_TOGOODS', opt);
    },
  }
}

export default isOrder