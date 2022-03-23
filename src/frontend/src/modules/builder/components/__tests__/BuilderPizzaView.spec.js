import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { getVuexMock, pizzaMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = getVuexMock({ cartEmpty: true });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has correct pizza name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("input").element.value).toBe("Тестовая пицца");
  });

  it("has correct foundation class", () => {
    createComponent({ store, localVue });
    expect(wrapper.find(".pizza").attributes("class")).toBe(
      `pizza pizza--foundation--small-tomato`
    );
  });

  it("has correct ingredient class", () => {
    createComponent({ store, localVue });
    expect(wrapper.find(".pizza__filling").attributes("class")).toBe(
      "pizza__filling pizza__filling--mushrooms"
    );
  });

  it("has working addToCart logic", async () => {
    createComponent({ store, localVue });
    await wrapper.find(".button").trigger("click");
    expect(store.state.Cart.pizzas[0].name).toBe(pizzaMock.name);
  });
});
