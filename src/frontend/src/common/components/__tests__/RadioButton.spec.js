import { mount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const wrapper = mount(RadioButton, {
    propsData: {
      className: "test-class",
      name: "test-name",
      value: "test-value",
    },
  });
  const input = wrapper.find("input");

  it("has correct class", () => {
    expect(input.attributes("class")).toBe("test-class");
  });

  it("has correct name", () => {
    expect(input.attributes("name")).toBe("test-name");
  });

  it("has correct value", () => {
    expect(input.attributes("value")).toBe("test-value");
  });

  it("emits updateSelected", () => {
    input.trigger("click");
    expect(wrapper.emitted().updateSelected).toBeTruthy();
  });
});
