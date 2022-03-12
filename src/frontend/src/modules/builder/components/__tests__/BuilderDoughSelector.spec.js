import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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

  it("has correct dough name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("b").text()).toBe("Тонкое");
  });

  it("has correct dough description", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("span").text()).toBe("Из твердых сортов пшеницы");
  });

  it("has correct class", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("label").attributes("class")).toBe(
      "dough__input dough__input--light"
    );
  });
});
