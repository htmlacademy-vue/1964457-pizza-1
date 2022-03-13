import { mount, createLocalVue } from "@vue/test-utils";
import OrdersHeader from "@/modules/orders/components/OrdersHeader";

const localVue = createLocalVue();

describe("OrdersHeader", () => {
  let wrapper;
  const propsData = { orderId: 1, orderPrice: 100 };

  const createComponent = (options) => {
    wrapper = mount(OrdersHeader, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("shows order id", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("b").text()).toBe(`Заказ #${propsData.orderId}`);
  });

  it("shows order price", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("span").text()).toBe(
      `Сумма заказа: ${propsData.orderPrice} ₽`
    );
  });
});
