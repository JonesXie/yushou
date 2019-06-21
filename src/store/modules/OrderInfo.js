const isOrder = {
  state: {
    confirmInfo: null,
    toSite: false,
    fromSite: false,
    siteData: null,
    couponData: null,
    toSitePath: "/center"
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
    SET_COUPONDATA: (state, opt) => {
      state.couponData = opt
    },
    SET_TOSITEPATH: (state, opt) => {
      state.toSitePath = opt
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
    setCouponData({
      commit
    }, opt) {
      commit('SET_COUPONDATA', opt);
    },
    setToSitePath({
      commit
    }, opt) {
      commit('SET_TOSITEPATH', opt);
    },
  }
}

export default isOrder