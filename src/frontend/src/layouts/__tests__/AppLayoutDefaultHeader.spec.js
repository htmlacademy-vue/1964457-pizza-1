import { mount, createLocalVue } from "@vue/test-utils";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "@/router/index.js";
import { getVuexMock, userMock } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("AppLayoutHeader (not authenticated)", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
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

  it("renders cart price", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find(".header__cart > a").text()).toBe(
      `${store.getters["Cart/cartPrice"]} ₽`
    );
  });

  it("renders login link", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find(".header__login")).toBeTruthy();
  });
});

describe("AppLayoutHeader (authenticated)", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    store = getVuexMock({ authenticated: true });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders cart price", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find(".header__cart > a").text()).toBe(
      `${store.getters["Cart/cartPrice"]} ₽`
    );
  });

  it("renders user avatar", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find("picture > img").attributes("src")).toBe(
      userMock.avatar
    );
  });

  it("renders img alt text", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find("picture > img").attributes("alt")).toBe(userMock.name);
  });

  it("renders user name", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find("[name=user_name]").text()).toBe(userMock.name);
  });

  it("renders logout link", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.find(".header__logout")).toBeTruthy();
  });
});
