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
    createComponent({ store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has image with correct alt text", () => {
    expect(wrapper.find("img").attributes("alt")).toBe(pizzaMock.name);
  });

  it("has correct name", () => {
    expect(wrapper.find("h2").text()).toBe(pizzaMock.name);
  });

  it("has correct size name", () => {
    expect(wrapper.find('span[name="size"]').text()).toBe(
      `${pizzaMock.size.name},`
    );
  });

  it("has correct dough name", () => {
    expect(wrapper.find('span[name="dough"]').text()).toBe(
      `Тесто: ${pizzaMock.dough.name.toLowerCase()}`
    );
  });

  it("has correct sauce name", () => {
    expect(wrapper.find('span[name="sauce"]').text()).toBe(
      `Соус: ${pizzaMock.sauce.name.toLowerCase()}`
    );
  });

  it("has correct ingredients", () => {
    expect(wrapper.find('span[name="ingredients"]').text()).toBe(
      `Начинка: ${pizzaMock.ingredients
        .map((i) => i.name.toLowerCase())
        .join(",")}`
    );
  });

  it("is able to increase pizza count", async () => {
    await wrapper
      .find(`li[pizzaid="${pizzaMock.id}"]`)
      .find(".counter__button--plus")
      .trigger("click");
    expect(
      store.state.Cart.pizzas.find((el) => el.id === pizzaMock.id).count
    ).toBe(pizzaMock.count + 1);
  });

  it("is able to decrease pizza count / remove pizza", async () => {
    await wrapper
      .find(`li[pizzaid="${pizzaMock.id}"]`)
      .find(".counter__button--minus")
      .trigger("click");
    if (pizzaMock.count > 1) {
      expect(
        store.state.Cart.pizzas.find((el) => el.id === pizzaMock.id).count
      ).toBe(pizzaMock.count - 1);
    } else {
      expect(store.state.Cart.pizzas.find((el) => el.id === pizzaMock.id)).toBe(
        undefined
      );
    }
  });
});
