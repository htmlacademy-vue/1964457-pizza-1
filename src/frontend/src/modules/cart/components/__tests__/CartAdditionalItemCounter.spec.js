import { mount, createLocalVue } from "@vue/test-utils";
import CartAdditionalItemCounter from "@/modules/cart/components/CartAdditionalItemCounter";
import { additionalItemMock } from "@/store/mocks";

const localVue = createLocalVue();

describe("CartAdditionalItemCounter", () => {
  let wrapper;
  const propsData = {
    item: additionalItemMock,
    min: 0,
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has minus button enabled", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(
      false
    );
  });

  it("has readonly input", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("input").element.readOnly).toBeTruthy();
  });

  it("has input with correct value", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("input").element.value).toBe(
      `${additionalItemMock.count}`
    );
  });

  it("has 'increase' event emitted", () => {
    createComponent({ localVue, propsData });
    wrapper.find(".counter__button--plus").trigger("click");
    expect(wrapper.emitted().increase).toBeTruthy();
  });

  it("has correct price", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("b").text()).toBe(
      `${additionalItemMock.price * additionalItemMock.count} ₽`
    );
  });
});
