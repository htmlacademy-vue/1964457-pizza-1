import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import { getVuexMock, sizeSmallMock, sizeMediumMock } from "@/store/mocks";

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
    createComponent({ store, localVue, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has small size option with correct class", () => {
    expect(
      wrapper.find(`label[sizeid="${sizeSmallMock.id}"]`).attributes("class")
    ).toBe("diameter__input diameter__input--small");
  });

  it("has has small size option with correct value", () => {
    expect(
      wrapper.find(`label[sizeid="${sizeSmallMock.id}"] > input`).element.value
    ).toBe("small");
  });

  it("has has small size option with correct name", () => {
    expect(
      wrapper.find(`label[sizeid="${sizeSmallMock.id}"] > span`).text()
    ).toBe(sizeSmallMock.name);
  });

  it("has medium size option with correct class", () => {
    expect(
      wrapper.find(`label[sizeid="${sizeMediumMock.id}"]`).attributes("class")
    ).toBe("diameter__input diameter__input--normal");
  });

  it("has has medium size option with correct value", () => {
    expect(
      wrapper.find(`label[sizeid="${sizeMediumMock.id}"] > input`).element.value
    ).toBe("normal");
  });

  it("has has medium size option with correct name", () => {
    expect(
      wrapper.find(`label[sizeid="${sizeMediumMock.id}"] > span`).text()
    ).toBe(sizeMediumMock.name);
  });

  it("is able to change selected size", async () => {
    await wrapper
      .find(`label[sizeid="${sizeMediumMock.id}"] > input`)
      .trigger("click");
    expect(store.state.Builder.selectedSize.id).toBe(sizeMediumMock.id);
  });
});
