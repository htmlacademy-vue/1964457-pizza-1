export default {
  namespaced: true,
  state: { totalPrice: 0 },
  getters: {},
  mutations: {
    incrementTotalPrice(state, payload) {
      state.totalPrice += payload;
    },
  },
  actions: {},
};
