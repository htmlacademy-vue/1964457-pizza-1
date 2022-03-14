import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ProfileUserInfo from "@/modules/profile/components/ProfileUserInfo";
import { getVuexMock, userMock } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ProfileUserInfo", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(ProfileUserInfo, options);
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

  it("renders user avatar", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("img").attributes("src")).toBe(userMock.avatar);
  });

  it("renders img alt name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("img").attributes("alt")).toBe(userMock.name);
  });
  it("renders user name", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("span").text()).toBe(userMock.name);
  });

  it("renders user phone", () => {
    createComponent({ store, localVue });
    expect(wrapper.find("p").text()).toBe(
      `Контактный телефон:${userMock.phone}`
    );
  });
});
