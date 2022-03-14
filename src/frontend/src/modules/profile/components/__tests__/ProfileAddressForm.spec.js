import { mount, createLocalVue } from "@vue/test-utils";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import { addressMock } from "@/store/mocks";

const localVue = createLocalVue();

describe("ProfileAddress", () => {
  let wrapper;

  const propsData = {
    address: addressMock,
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileAddressForm, options);
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

  it("renders address name in input", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('input[name="addr-name"]').element.value).toBe(
      addressMock.name
    );
  });

  it("renders street in input", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('input[name="addr-street"]').element.value).toBe(
      addressMock.street
    );
  });

  it("renders building in input", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('input[name="addr-house"]').element.value).toBe(
      addressMock.building
    );
  });

  it("renders flat in input", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('input[name="addr-apartment"]').element.value).toBe(
      addressMock.flat
    );
  });

  it("renders comment in input", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('input[name="addr-comment"]').element.value).toBe(
      addressMock.comment
    );
  });
});
