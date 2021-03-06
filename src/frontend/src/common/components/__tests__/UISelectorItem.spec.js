import { mount, createLocalVue } from "@vue/test-utils";
import UISelectorItem from "@/common/components/UISelectorItem";

describe("UISelectorItem", () => {
  let wrapper;
  const propsData = {
    ingredient: {
      id: 1,
      name: "Тест",
      image: "/public/img/filling/test.svg",
      price: 33,
      count: 0,
    },
    draggable: true,
  };

  const localVue = createLocalVue();

  const createComponent = (options) => {
    wrapper = mount(UISelectorItem, options);
  };

  beforeEach(() => {
    createComponent({ propsData, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has correct class", () => {
    expect(wrapper.find("span").attributes("class")).toContain("filling--test");
  });

  it("has correct name", () => {
    expect(wrapper.find("span").text()).toBe("Тест");
  });
});
