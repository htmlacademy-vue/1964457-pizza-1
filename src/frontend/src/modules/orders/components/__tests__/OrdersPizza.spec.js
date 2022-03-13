import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import OrdersPizza from "@/modules/orders/components/OrdersPizza";
import { getVuexMock, orderPizzaMock, pizzaMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("OrdersPizza", () => {
  let wrapper;
  let store;
  let propsData = { pizza: orderPizzaMock };

  const createComponent = (options) => {
    wrapper = mount(OrdersPizza, options);
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

  it("renders pizza image alt text", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("img").attributes("alt")).toBe(pizzaMock.name);
  });

  it("renders pizza name", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("h2").text()).toBe(pizzaMock.name);
  });

  it("renders pizza size", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("span[name='size']").text()).toBe(
      `${pizzaMock.size.name},`
    );
  });

  it("renders pizza dough", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("span[name='dough']").text()).toBe("на тонком тесте");
  });

  it("renders pizza sauce", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("li[name='sauce']").text()).toBe(
      `Соус: ${pizzaMock.sauce.name.toLowerCase()}`
    );
  });

  it("renders pizza ingredients", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("li[name='ingredients']").text()).toBe(
      `Начинка: ${pizzaMock.ingredients
        .map((e) => e.name.toLowerCase())
        .join(", ")}`
    );
  });

  it("renders pizza price", () => {
    const price =
      (pizzaMock.ingredients.map((e) => e.price).reduce((a, b) => a + b, 0) +
        pizzaMock.dough.price +
        pizzaMock.sauce.price) *
      pizzaMock.size.multiplier;
    createComponent({ store, localVue, propsData });
    expect(wrapper.find(".order__price").text()).toBe(`${price} ₽`);
  });
});
