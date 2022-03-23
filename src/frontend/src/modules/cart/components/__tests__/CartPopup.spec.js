import { mount, createLocalVue } from "@vue/test-utils";
import CartPopup from "@/modules/cart/components/CartPopup";

const localVue = createLocalVue();

describe("CartPopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartPopup, options);
  };

  beforeEach(() => {
    createComponent({ localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("emits 'close' when close icon is pressed", () => {
    wrapper.find(".close").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emits 'close' when button is pressed", () => {
    wrapper.find(".button").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
