import { mount, createLocalVue } from "@vue/test-utils";
import CartItemCounter from "@/modules/cart/components/CartItemCounter";
const localVue = createLocalVue();

describe("CartItemCounter", () => {
  let wrapper;
  let store;
  const propsData = { current: 1 };
  const createComponent = (options) => {
    wrapper = mount(CartItemCounter, options);
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

  it("has plus button enabled", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(
      false
    );
  });

  it("has readonly input", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("input").element.readOnly).toBeTruthy();
  });

  it("has input with correct value", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("input").element.value).toBe(`${propsData.current}`);
  });

  it("has 'decrease' event emitted", () => {
    createComponent({ store, localVue, propsData });
    wrapper.find(".counter__button--minus").trigger("click");
    expect(wrapper.emitted().decrease).toBeTruthy();
  });

  it("has 'increase' event emitted", () => {
    createComponent({ store, localVue, propsData });
    wrapper.find(".counter__button--plus").trigger("click");
    expect(wrapper.emitted().increase).toBeTruthy();
  });
});
