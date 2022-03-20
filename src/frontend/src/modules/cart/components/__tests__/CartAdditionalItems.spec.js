import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartAdditionalItems from "@/modules/cart/components/CartAdditionalItems";
import { getVuexMock, additionalItemMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("CartAdditionalItems", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItems, options);
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

  it("has correct image url", () => {
    expect(wrapper.find("img").attributes("src")).toBe(
      additionalItemMock.image
    );
  });

  it("has correct image alt text", () => {
    expect(wrapper.find("img").attributes("alt")).toBe(additionalItemMock.name);
  });

  it("has correct name", () => {
    expect(wrapper.find("span").text()).toBe(additionalItemMock.name);
  });

  it("is able to increase item count", async () => {
    const expectedValue = additionalItemMock.count + 1;
    await wrapper.find(".counter__button--plus").trigger("click");
    expect(
      store.state.Cart.additionalItems.find(
        (el) => el.id === additionalItemMock.id
      ).count
    ).toBe(expectedValue);
  });

  it("is able to decrease item count", async () => {
    const expectedValue = additionalItemMock.count - 1;
    await wrapper.find(".counter__button--minus").trigger("click");
    expect(
      store.state.Cart.additionalItems.find(
        (el) => el.id === additionalItemMock.id
      ).count
    ).toBe(expectedValue);
  });
});
