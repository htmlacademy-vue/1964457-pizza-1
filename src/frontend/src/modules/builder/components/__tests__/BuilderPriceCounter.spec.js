import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  const propsData = {
    pizzaName: "Тестовая пицца",
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
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

  it("has enabled button", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("button").element.disabled).toBe(false);
  });

  it("has correct pizza price", () => {
    createComponent({ store, localVue, propsData });
    expect(wrapper.find("p").text()).toBe("Итого 383 ₽");
  });

  it("emits 'addToCart'", () => {
    createComponent({ store, localVue, propsData });
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted().addToCart).toBeTruthy();
  });
});
