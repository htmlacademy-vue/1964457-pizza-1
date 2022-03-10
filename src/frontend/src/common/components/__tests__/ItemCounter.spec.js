import { mount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter with min values", () => {
  const wrapper = mount(ItemCounter, {
    propsData: {
      min: 0,
      current: 0,
      max: 1,
    },
  });
  const minus_button = wrapper.find(".counter__button--minus");
  const plus_button = wrapper.find(".counter__button--plus");
  const input = wrapper.find(".counter__input");

  it("Minus button is disabled", () => {
    expect(minus_button.element.disabled).toBe(true);
  });

  it("Plus button is enabled", () => {
    expect(plus_button.element.disabled).toBe(false);
  });

  it("Input element is readonly", () => {
    expect(input.element.readOnly).toBe(true);
  });

  it("Input element has currect inital value", () => {
    expect(input.element.value).toBe("0");
  });

  it("Click on plus button emits 'increase'", () => {
    plus_button.trigger("click");
    expect(wrapper.emitted().increase).toBeTruthy();
  });
});

describe("ItemCounter with max values", () => {
  const wrapper = mount(ItemCounter, {
    propsData: {
      min: 0,
      current: 1,
      max: 1,
    },
  });
  const minus_button = wrapper.find(".counter__button--minus");
  const plus_button = wrapper.find(".counter__button--plus");
  const input = wrapper.find(".counter__input");

  it("Minus button is enabled", () => {
    expect(minus_button.element.disabled).toBe(false);
  });

  it("Plus button is disabled", () => {
    expect(plus_button.element.disabled).toBe(true);
  });

  it("Input element has currect inital value", () => {
    expect(input.element.value).toBe("1");
  });

  it("Click on minus button emits 'decrease'", () => {
    minus_button.trigger("click");
    expect(wrapper.emitted().decrease).toBeTruthy();
  });
});
