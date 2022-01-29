export default {
  namespaced: true,
  state: { isAuthenticated: false, user: null },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      let data;
      try {
        data = await this.$api.auth.login(credentials);
      } catch (e) {
        console.error(e);
        return;
      }
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      await dispatch("getMe");
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit("setUser", { isAuthenticated: false, user: null });
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit("setUser", { isAuthenticated: true, user: data });
      } catch (e) {
        // Note: in case of not proper login, i.e. token is expired
        dispatch("logout", false);
      }
    },
  },
};
