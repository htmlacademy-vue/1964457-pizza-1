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
    createComponent({ localVue, store, router });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders cart price", () => {
    expect(wrapper.find(".header__cart > a").text()).toBe(`439 ₽`);
  });

  it("renders login link", () => {
    expect(wrapper.find(".header__login")).toBeTruthy();
  });

  it("has working /cart link", async () => {
    await wrapper.find('a[href="/cart"]').trigger("click")
    expect(router.currentRoute.name).toBe('Cart')
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
    createComponent({ localVue, store, router });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders cart price", () => {
    expect(wrapper.find(".header__cart > a").text()).toBe(`439 ₽`);
  });

  it("renders user avatar", () => {
    expect(wrapper.find("picture > img").attributes("src")).toBe(
      userMock.avatar
    );
  });

  it("renders img alt text", () => {
    expect(wrapper.find("picture > img").attributes("alt")).toBe(userMock.name);
  });

  it("renders user name", () => {
    expect(wrapper.find("[name=user_name]").text()).toBe(userMock.name);
  });

  it("renders logout link", () => {
    expect(wrapper.find(".header__logout")).toBeTruthy();
  });

  it("has working /cart link", async () => {
    await wrapper.find('a[href="/cart"]').trigger("click")
    expect(router.currentRoute.name).toBe('Cart')
  });
});
