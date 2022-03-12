import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getVuexMock } from "@/store/mocks";
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
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });
  it("has correct sauce name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("span").text()).toBe("Томатный");
  });
});
