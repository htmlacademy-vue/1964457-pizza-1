import { mount, createLocalVue } from "@vue/test-utils";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import { addressMock } from "@/store/mocks";

const localVue = createLocalVue();

describe("ProfileAddress", () => {
  let wrapper;

  const propsData = {
    id: addressMock.id,
    name: addressMock.name,
    comment: addressMock.comment,
    street: addressMock.street,
    building: addressMock.building,
    flat: addressMock.flat,
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders address name", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("b").text()).toBe(addressMock.name);
  });

  it("renders full address address", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find("p").text()).toBe(
      [addressMock.street, addressMock.building, addressMock.flat].join(", ")
    );
  });

  it("button emits `edit`", () => {
    createComponent({ localVue, propsData });
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted().edit).toBeTruthy();
  });
});
