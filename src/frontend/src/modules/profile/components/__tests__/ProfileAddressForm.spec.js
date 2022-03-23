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

  beforeEach(() => {
    createComponent({ localVue, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders address name", () => {
    expect(wrapper.find("b").text()).toBe(addressMock.name);
  });

  it("renders address name in input", () => {
    expect(wrapper.find('input[name="addr-name"]').element.value).toBe(
      addressMock.name
    );
  });

  it("renders street in input", () => {
    expect(wrapper.find('input[name="addr-street"]').element.value).toBe(
      addressMock.street
    );
  });

  it("renders building in input", () => {
    expect(wrapper.find('input[name="addr-house"]').element.value).toBe(
      addressMock.building
    );
  });

  it("renders flat in input", () => {
    expect(wrapper.find('input[name="addr-apartment"]').element.value).toBe(
      addressMock.flat
    );
  });

  it("renders comment in input", () => {
    expect(wrapper.find('input[name="addr-comment"]').element.value).toBe(
      addressMock.comment
    );
  });

  it("emits 'delete'", async () => {
    await wrapper.find('button[name="delete"]').trigger("click");
    expect(wrapper.emitted().deleteAddress).toBeTruthy();
  });

  it("emits 'edit'", async () => {
    await wrapper.find('button[name="save"]').trigger("click");
    expect(wrapper.emitted().updateAddress).toBeTruthy();
  });
});
