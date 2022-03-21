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
    createComponent({ store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders user avatar", () => {
    expect(wrapper.find("img").attributes("src")).toBe(userMock.avatar);
  });

  it("renders img alt name", () => {
    expect(wrapper.find("img").attributes("alt")).toBe(userMock.name);
  });
  it("renders user name", () => {
    expect(wrapper.find("span").text()).toBe(userMock.name);
  });

  it("renders user phone", () => {
    expect(wrapper.find("p").text()).toBe(
      `Контактный телефон:${userMock.phone}`
    );
  });
});
