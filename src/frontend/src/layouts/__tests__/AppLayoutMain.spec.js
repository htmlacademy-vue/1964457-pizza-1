import { mount, createLocalVue } from "@vue/test-utils";
import AppLayoutMain from "@/layouts/AppLayoutMain";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "@/router/index.js";

import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("AppLayoutMain", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutMain, options);
  };

  beforeEach(() => {
    store = getVuexMock();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });
});
