import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "@/views/Profile";
import { getVuexMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Profile", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
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

  it("shows address form when button is pressed", async () => {
    createComponent({ store, localVue });
    await wrapper.find("button").trigger("click");
    expect(wrapper.find(".modal-mask").exists()).toBeTruthy();
  });
});
