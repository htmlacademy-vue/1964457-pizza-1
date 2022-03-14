import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cart from "@/views/Cart";
import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Cart", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
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

  it("renders cart`s price", () => {
    createComponent({ store, localVue });
    expect(wrapper.find(".footer__price > b").text()).toBe(`Итого: 439 ₽`);
  });
});

describe("Cart (empty)", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    store = getVuexMock({ cartEmpty: true });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders cart`s empty message", () => {
    createComponent({ store, localVue });
    expect(wrapper.find(".cart__empty > p").text()).toBe(
      `В корзине нет ни одного товара`
    );
  });
});
