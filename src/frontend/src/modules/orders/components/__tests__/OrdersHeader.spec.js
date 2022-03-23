import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import OrdersHeader from "@/modules/orders/components/OrdersHeader";
import { getVuexMock, orderPizzaMock, orderMock } from "@/store/mocks";
import router from "@/router/index.js";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("OrdersHeader", () => {
  let wrapper;
  let store;
  const propsData = { orderId: orderMock.id, orderPrice: 100 };

  const createComponent = (options) => {
    wrapper = mount(OrdersHeader, options);
  };

  beforeEach(() => {
    store = getVuexMock({ cartEmpty: true });
    createComponent({ localVue, propsData, store, router });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("shows order id", () => {
    expect(wrapper.find("b").text()).toBe(`Заказ #${propsData.orderId}`);
  });

  it("shows order price", () => {
    expect(wrapper.find("span").text()).toBe(
      `Сумма заказа: ${propsData.orderPrice} ₽`
    );
  });

  it("is possible to repeat order", async () => {
    await wrapper.find('button[name="repeat-button"]').trigger("click");
    const cartPizza = store.state.Cart.pizzas[0];
    expect(cartPizza.name).toBe(orderPizzaMock.name);
    expect(cartPizza.count).toBe(orderPizzaMock.quantity);
    expect(cartPizza.sauce.id).toBe(orderPizzaMock.sauceId);
    expect(cartPizza.dough.id).toBe(orderPizzaMock.doughId);
    expect(cartPizza.size.id).toBe(orderPizzaMock.sizeId);
    expect(cartPizza.ingredients[0].id).toBe(orderPizzaMock.ingredients[0].id);
    expect(cartPizza.ingredients[0].count).toBe(
      orderPizzaMock.ingredients[0].quantity
    );
  });
});
