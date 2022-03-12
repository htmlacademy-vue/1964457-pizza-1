import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartAddressForm from "@/modules/cart/components/CartAddressForm";
import { getVuexMock, newAddressMock, addressMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("CartAddressForm (user is not logged in)", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAddressForm, options);
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
  it("has new address street set", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("[name=street]").element.value).toBe(
      newAddressMock.street
    );
  });
  it("has new address building set", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("[name=house]").element.value).toBe(
      newAddressMock.building
    );
  });
  it("has new address flat set", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("[name=apartment]").element.value).toBe(
      newAddressMock.flat
    );
  });
});

describe("CartAddressForm (user is logged in)", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAddressForm, options);
  };

  beforeEach(() => {
    store = getVuexMock({ authenticated: true });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has user`s address as delivery option", () => {
    createComponent({ store, localVue });
    expect(wrapper.find(`option[value="${addressMock.id}"]`).text()).toBe(
      addressMock.name
    );
  });
});
