import { mount, createLocalVue } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter with min values", () => {
  let wrapper;
  const propsData = {
    min: 0,
    current: 0,
    max: 1,
  };
  const localVue = createLocalVue();

  const createComponent = (options) => {
    wrapper = mount(ItemCounter, options);
  };

  beforeEach(() => {
    createComponent({ propsData, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  // const minus_button = wrapper.find(".counter__button--minus");
  // const plus_button = wrapper.find(".counter__button--plus");
  // const input = wrapper.find(".counter__input");

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

describe("ItemCounter with max values", () => {
  let wrapper;
  const propsData = {
    min: 0,
    current: 1,
    max: 1,
  };

  const localVue = createLocalVue();

  const createComponent = (options) => {
    wrapper = mount(ItemCounter, options);
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
