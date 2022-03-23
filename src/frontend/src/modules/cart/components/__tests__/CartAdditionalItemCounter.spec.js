import { mount, createLocalVue } from "@vue/test-utils";
import CartAdditionalItemCounter from "@/modules/cart/components/CartAdditionalItemCounter";
import { additionalItemMock } from "@/store/mocks";

const localVue = createLocalVue();

describe("CartAdditionalItemCounter (min=0)", () => {
  let wrapper;
  const propsData = {
    item: additionalItemMock,
    min: 0,
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItemCounter, options);
  };

  beforeEach(() => {
    createComponent({ localVue, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has minus button enabled", () => {
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(
      false
    );
  });

  it("has plus button enabled", () => {
    expect(wrapper.find(".counter__button--plus").element.disabled).toBe(false);
  });

  it("has readonly input", () => {
    expect(wrapper.find("input").element.readOnly).toBeTruthy();
  });

  it("has input with correct value", () => {
    expect(wrapper.find("input").element.value).toBe(
      `${additionalItemMock.count}`
    );
  });

  it("has 'increase' event emitted", () => {
    wrapper.find(".counter__button--plus").trigger("click");
    expect(wrapper.emitted().increase).toBeTruthy();
  });

  it("has 'decrease' event emitted", () => {
    createComponent({ localVue, propsData });
    wrapper.find(".counter__button--minus").trigger("click");
    expect(wrapper.emitted().decrease).toBeTruthy();
  });

  it("has correct price", () => {
    expect(wrapper.find("b").text()).toBe(
      `${additionalItemMock.price * additionalItemMock.count} ₽`
    );
  });
});

describe("CartAdditionalItemCounter (min=1)", () => {
  let wrapper;
  const propsData = {
    item: additionalItemMock,
    min: 1,
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItemCounter, options);
  };

  beforeEach(() => {
    createComponent({ localVue, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has minus button disabled", () => {
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(true);
  });

  it("has plus button enabled", () => {
    expect(wrapper.find(".counter__button--plus").element.disabled).toBe(false);
  });
});
