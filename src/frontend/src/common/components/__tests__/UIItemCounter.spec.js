import { mount, createLocalVue } from "@vue/test-utils";
import UIItemCounter from "@/common/components/UIItemCounter";

describe("UIItemCounter with min values", () => {
  let wrapper;
  const propsData = {
    min: 0,
    current: 0,
    max: 1,
  };
  const localVue = createLocalVue();

  const createComponent = (options) => {
    wrapper = mount(UIItemCounter, options);
  };

  beforeEach(() => {
    createComponent({ propsData, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Minus button is disabled", () => {
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(true);
  });

  it("Plus button is enabled", () => {
    expect(wrapper.find(".counter__button--plus").element.disabled).toBe(false);
  });

  it("Input element is readonly", () => {
    expect(wrapper.find(".counter__input").element.readOnly).toBe(true);
  });

  it("Input element has currect inital value", () => {
    expect(wrapper.find(".counter__input").element.value).toBe("0");
  });

  it("Click on plus button emits 'increase'", () => {
    wrapper.find(".counter__button--plus").trigger("click");
    expect(wrapper.emitted().increase).toBeTruthy();
  });
});

describe("UIItemCounter with max values", () => {
  let wrapper;
  const propsData = {
    min: 0,
    current: 1,
    max: 1,
  };

  const localVue = createLocalVue();

  const createComponent = (options) => {
    wrapper = mount(UIItemCounter, options);
  };

  beforeEach(() => {
    createComponent({ propsData, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Minus button is enabled", () => {
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(
      false
    );
  });

  it("Plus button is disabled", () => {
    expect(wrapper.find(".counter__button--plus").element.disabled).toBe(true);
  });

  it("Input element has currect inital value", () => {
    expect(wrapper.find(".counter__input").element.value).toBe("1");
  });

  it("Click on minus button emits 'decrease'", () => {
    wrapper.find(".counter__button--minus").trigger("click");
    expect(wrapper.emitted().decrease).toBeTruthy();
  });
});
