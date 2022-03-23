import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getVuexMock, sauceTomatoMock, sauceCreamMock } from "@/store/mocks";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = getVuexMock();
    createComponent({ store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders tomato sauce option with correct name", () => {
    expect(
      wrapper.find(`label[sauceid="${sauceTomatoMock.id}"] > span`).text()
    ).toBe(sauceTomatoMock.name);
  });

  it("renders tomato sauce option with correct input value ", () => {
    expect(
      wrapper
        .find(`label[sauceid="${sauceTomatoMock.id}"] > input`)
        .attributes("value")
    ).toBe("tomato");
  });

  it("renders cream sauce option with correct name", () => {
    expect(
      wrapper.find(`label[sauceid="${sauceCreamMock.id}"] > span`).text()
    ).toBe(sauceCreamMock.name);
  });

  it("renders cream sauce option with correct input value ", () => {
    expect(
      wrapper
        .find(`label[sauceid="${sauceCreamMock.id}"] > input`)
        .attributes("value")
    ).toBe("creamy");
  });

  it("has update sauce functionality", async () => {
    await wrapper
      .find(`label[sauceid="${sauceCreamMock.id}"] > input`)
      .trigger("click");
    expect(store.state.Builder.selectedSauce.name).toBe(sauceCreamMock.name);
  });

  it("has add ingredient funtionality", async () => {
    await wrapper.find(".counter__button--plus").trigger("click");
    expect(store.getters["Builder/selectedIngredients"][0].count).toBe(2);
  });

  it("has remove ingredient functionality", async () => {
    await wrapper.find(".counter__button--minus").trigger("click");
    expect(store.getters["Builder/selectedIngredients"].length).toBe(0);
  });
});
