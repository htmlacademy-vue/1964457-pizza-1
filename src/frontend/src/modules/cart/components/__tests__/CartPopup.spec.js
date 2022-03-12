import { mount, createLocalVue } from "@vue/test-utils";
import CartPopup from "@/modules/cart/components/CartPopup";

const localVue = createLocalVue();

describe("CartPopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("emits 'close' when close icon is pressed", () => {
    createComponent({ localVue });
    wrapper.find(".close").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emits 'close' when button is pressed", () => {
    createComponent({ localVue });
    wrapper.find(".button").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
