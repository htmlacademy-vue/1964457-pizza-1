import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import OrdersMisc from "@/modules/orders/components/OrdersMisc";
import {
  getVuexMock,
  orderMiscItemMock,
  additionalItemMock,
} from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("OrdersMisc", () => {
  let wrapper;
  let store;
  let propsData = { misc: orderMiscItemMock };

  const createComponent = (options) => {
    wrapper = mount(OrdersMisc, options);
  };

  beforeEach(() => {
    store = getVuexMock();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders misc image", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("img").attributes("src")).toBe(
      additionalItemMock.image
    );
  });

  it("renders misc image alt text", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("img").attributes("alt")).toBe(additionalItemMock.name);
  });

  it("renders misc name", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("span").text()).toBe(additionalItemMock.name);
  });

  it("renders misc price", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("b").text()).toBe(
      `${additionalItemMock.price * orderMiscItemMock.quantity} ₽`
    );
  });
});
