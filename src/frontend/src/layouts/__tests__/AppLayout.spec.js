import { mount, createLocalVue } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "@/router/index.js";

import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("AppLayout", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppLayout, options);
  };

  beforeEach(() => {
    store = getVuexMock();
    createComponent({ localVue, store, router });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
