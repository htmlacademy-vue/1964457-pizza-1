import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartAdditionalItems from "@/modules/cart/components/CartAdditionalItems";
import { getVuexMock, additionalItemMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("CartAdditionalItems", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItems, options);
  };

  beforeEach(() => {
    store = getVuexMock();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });
  it("has correct image url", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("img").attributes("src")).toBe(
      additionalItemMock.image
    );
  });
  it("has correct image alt text", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("img").attributes("alt")).toBe(additionalItemMock.name);
  });
  it("has correct name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("span").text()).toBe(additionalItemMock.name);
  });
});
