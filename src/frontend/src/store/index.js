import Vue from "vue";
import Vuex from "vuex";
import Cart from "./Cart.js";
import Builder from "./Builder.js";
import Auth from "./Auth.js";
import Profile from "./Profile.js";
import Orders from "./Orders.js";

import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async init({ commit, rootState, dispatch }) {
      const sizes = await this.$api.sizes.query();
      const dough = await this.$api.dough.query();
      const ingredients = await this.$api.ingredients.query();
      const misc = await this.$api.misc.query();
      const sauces = await this.$api.sauces.query();
      commit("Builder/initState", { sizes, dough, ingredients, misc, sauces });
      commit("Cart/initState", misc);
      if (rootState.Auth.isAuthenticated) {
        dispatch("Orders/initOrders");
        dispatch("Profile/initAddresses");
      }
    },
  },
  plugins: [VuexPlugins],
  modules: {
    Cart,
    Builder,
    Auth,
    Profile,
    Orders,
  },
});
