export default {
  namespaced: true,
  state: { orders: null },
  getters: {},
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async initOrders({ commit }) {
      const orders = await this.$api.orders.query();
      commit("setOrders", orders);
    },
    async submitOrder({ rootState, dispatch }, order) {
      await this.$api.orders.post(order);
      if (rootState.Auth.isAuthenticated) {
        dispatch("initOrders");
        if (rootState.Cart.deliveryMethod === "new-address") {
          dispatch("Profile/initAddresses", null, { root: true });
        }
      }
    },
  },
};
