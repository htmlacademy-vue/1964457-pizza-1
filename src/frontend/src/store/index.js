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
      this.$api.sizes.query().then((data) => commit("Builder/initSizes", data));
      this.$api.dough.query().then((data) => commit("Builder/initDough", data));
      this.$api.ingredients
        .query()
        .then((data) => commit("Builder/initIngredients", data));
      this.$api.sauces
        .query()
        .then((data) => commit("Builder/initSauces", data));
      this.$api.misc
        .query()
        .then((data) => commit("Cart/setAdditionalItems", data));
      dispatch("Cart/setPhone");
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
