import { mount, createLocalVue } from "@vue/test-utils";
import UIRadioButton from "@/common/components/UIRadioButton";

describe("UIRadioButton", () => {
  let wrapper;
  const propsData = {
    className: "test-class",
    name: "test-name",
    value: "test-value",
  };
  const localVue = createLocalVue();

  const createComponent = (options) => {
    wrapper = mount(UIRadioButton, options);
  };

  beforeEach(() => {
    createComponent({ propsData, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has correct class", () => {
    expect(wrapper.find("input").attributes("class")).toBe("test-class");
  });

  it("has correct name", () => {
    expect(wrapper.find("input").attributes("name")).toBe("test-name");
  });

  it("has correct value", () => {
    expect(wrapper.find("input").attributes("value")).toBe("test-value");
  });

  it("emits updateSelected", () => {
    wrapper.find("input").trigger("click");
    expect(wrapper.emitted().updateSelected).toBeTruthy();
  });
});
