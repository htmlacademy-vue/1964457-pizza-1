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
    async addAddress({ dispatch }, address) {
      await this.$api.addresses.post(address);
      dispatch("initAddresses");
    },
    async updateAddress({ dispatch }, address) {
      await this.$api.addresses.put(address);
      dispatch("initAddresses");
    },
    async deleteAddress({ dispatch }, addressId) {
      await this.$api.addresses.delete(addressId);
      dispatch("initAddresses");
    },
  },
};
