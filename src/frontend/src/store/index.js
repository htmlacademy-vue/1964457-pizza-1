import Vue from "vue";
import Vuex from "vuex";
import Cart from "./Cart.js";
import Builder from "./Builder.js";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [VuexPlugins],
  modules: {
    Cart,
    Builder,
  },
});
