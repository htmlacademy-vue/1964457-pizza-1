import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import { getVuexMock, pizzaMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("CartPizzaList", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartPizzaList, options);
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

  it("has image with correct alt text", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("img").attributes("alt")).toBe(pizzaMock.name);
  });

  it("has correct name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("h2").text()).toBe(pizzaMock.name);
  });

  it("has correct size name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find('span[name="size"]').text()).toBe(
      `${pizzaMock.size.name},`
    );
  });

  it("has correct dough name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find('span[name="dough"]').text()).toBe(
      `Тесто: ${pizzaMock.dough.name.toLowerCase()}`
    );
  });

  it("has correct sauce name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find('span[name="sauce"]').text()).toBe(
      `Соус: ${pizzaMock.sauce.name.toLowerCase()}`
    );
  });

  it("has correct ingredients", () => {
    createComponent({ store, localVue });
    expect(wrapper.find('span[name="ingredients"]').text()).toBe(
      `Начинка: ${pizzaMock.ingredients
        .map((i) => i.name.toLowerCase())
        .join(",")}`
    );
  });
});
