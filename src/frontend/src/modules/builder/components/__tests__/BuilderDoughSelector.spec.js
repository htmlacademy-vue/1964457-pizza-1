import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import { getVuexMock, doughLightMock, doughLargeMock } from "@/store/mocks";

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
    createComponent({ store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has dough-light option with correct class", () => {
    expect(
      wrapper.find(`label[doughid="${doughLightMock.id}"]`).attributes("class")
    ).toBe("dough__input dough__input--light");
  });

  it("has dough-light option with correct name", () => {
    expect(
      wrapper.find(`label[doughid="${doughLightMock.id}"] > b`).text()
    ).toBe(doughLightMock.name);
  });

  it("has dough-light option with correct description", () => {
    expect(
      wrapper.find(`label[doughid="${doughLightMock.id}"] > span`).text()
    ).toBe(doughLightMock.description);
  });

  it("has dough-large option with correct class", () => {
    expect(
      wrapper.find(`label[doughid="${doughLargeMock.id}"]`).attributes("class")
    ).toBe("dough__input dough__input--large");
  });

  it("has dough-large option with correct name", () => {
    expect(
      wrapper.find(`label[doughid="${doughLargeMock.id}"] > b`).text()
    ).toBe(doughLargeMock.name);
  });

  it("has dough-large option with correct description", () => {
    expect(
      wrapper.find(`label[doughid="${doughLargeMock.id}"] > span`).text()
    ).toBe(doughLightMock.description);
  });

  it("able to change dough option", async () => {
    await wrapper
      .find(`label[doughid="${doughLargeMock.id}"] > input`)
      .trigger("click");
    expect(store.state.Builder.selectedDough.name).toBe(doughLargeMock.name);
  });
});
