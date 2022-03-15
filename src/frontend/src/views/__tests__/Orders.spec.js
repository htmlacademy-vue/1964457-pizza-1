import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Orders from "@/views/Orders";
import { getVuexMock, orderMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
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

  it("renders delivery address", () => {
    createComponent({ store, localVue });
    expect(wrapper.find(".order__address").text()).toBe(
      `Адрес доставки: ${orderMock.orderAddress.name}`
    );
  });
});
