import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  const propsData = {
    pizzaName: "Тестовая пицца",
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = getVuexMock();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has correct class", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find(".diameter__input").attributes("class")).toBe(
      "diameter__input diameter__input--small"
    );
  });

  it("has correct value", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("input").element.value).toBe("small");
  });

  it("has correct name", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("span").text()).toBe("23 см");
  });
});
