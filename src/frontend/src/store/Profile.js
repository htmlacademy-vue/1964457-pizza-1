export default {
  namespaced: true,
  state: { addresses: null },
  getters: {},
  mutations: {
    setAddresses(state, payload) {
      state.addresses = payload;
    },
  },
  actions: {
    async initAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit("setAddresses", addresses);
    },
  },
};
