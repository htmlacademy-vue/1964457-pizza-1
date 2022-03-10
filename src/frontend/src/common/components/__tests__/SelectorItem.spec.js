import { mount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("SelectorItem", () => {
  const wrapper = mount(SelectorItem, {
    propsData: {
      ingredient: {
        id: 1,
        name: "Тест",
        image: "/public/img/filling/test.svg",
        price: 33,
        count: 0,
      },
      draggable: true,
    },
  });
  const span = wrapper.find("span");
  it("has correct class", () => {
    expect(span.attributes("class")).toContain("filling--test");
  });

  it("has correct name", () => {
    expect(span.text()).toBe("Тест");
  });
});
