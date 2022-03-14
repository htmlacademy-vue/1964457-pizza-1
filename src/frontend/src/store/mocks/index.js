import { cloneDeep } from "lodash";

import Builder from "@/store/Builder.js";
import Cart from "@/store/Cart";
import Vuex from "vuex";

const sauceMock = { id: 1, name: "Томатный", price: 50 };
const ingredientMock = {
  id: 1,
  name: "Грибы",
  image: "/public/img/filling/mushrooms.svg",
  price: 33,
  count: 1,
};
const doughMock = {
  id: 1,
  name: "Тонкое",
  image: "/public/img/dough-light.svg",
  description: "Из твердых сортов пшеницы",
  price: 300,
};
const sizeMock = {
  id: 1,
  name: "23 см",
  image: "/public/img/diameter.svg",
  multiplier: 1,
};
const pizzaNameMock = "Тестовая пицца";
const pizzaIdMock = 1;
const pizzaCountMock = 1;
export const pizzaMock = {
  id: pizzaIdMock,
  name: pizzaNameMock,
  sauce: sauceMock,
  dough: doughMock,
  size: sizeMock,
  ingredients: [ingredientMock],
  price: 383,
  count: 1,
};
export const additionalItemMock = {
  id: 1,
  name: "Cola-Cola 0,5 литра",
  image: "/public/img/cola.svg",
  price: 56,
  count: 1,
};
export const newAddressMock = {
  street: "Новая улица",
  building: "11",
  flat: "12",
};
const deliveryMethodMock = "new-address";
export const userMock = {
  id: "e9707be9-96f7-42bf-a3b3-5d7788616c08",
  name: "Вася Пупкин",
  email: "user@example.com",
  avatar: "/public/img/users/user.jpg",
  phone: "+777 777 777",
};
export const addressMock = {
  id: 1,
  name: "Тест",
  street: "Тестовая",
  building: "1",
  flat: "1",
  comment: "Это тестовый адрес",
  userId: "e9707be9-96f7-42bf-a3b3-5d7788616c08",
};
export const orderMiscItemMock = { id: 1, quantity: 1, orderId: 1, miscId: 1 };
export const orderPizzaMock = {
  id: 1,
  name: pizzaNameMock,
  quantity: 1,
  sauceId: 1,
  doughId: 1,
  sizeId: 1,
  orderId: 1,
  ingredients: [{ id: 1, quantity: 1, pizzaId: 1, ingredientId: 1 }],
};
const orderMock = {
  addressId: 1,
  id: 1,
  orderAddress: addressMock,
  orderMisc: [orderMiscItemMock],
  orderPizzas: [orderPizzaMock],
  phone: userMock.phone,
  userid: userMock.id,
};

// Builder module
const BuilderMock = {
  state: {
    dough: [doughMock],
    sauces: [sauceMock],
    sizes: [sizeMock],
    selectedDough: doughMock,
    selectedSauce: sauceMock,
    selectedSize: sizeMock,
    ingredients: { 1: ingredientMock },
    ingredientsArray: [ingredientMock],
    pizzaName: pizzaNameMock,
    pizaId: pizzaIdMock,
    pizzaCount: pizzaCountMock,
  },
  getters: Builder.getters,
  namespaced: true,
};

// Cart Module
const CartMock = {
  state: {
    pizzas: [pizzaMock],
    additionalItems: [additionalItemMock],
    pizzaCounter: 1,
    newAddress: newAddressMock,
    deliveryMethod: deliveryMethodMock,
    phone: "",
  },
  getters: Cart.getters,
  namespaced: true,
};

const EmptyCartMock = {
  state: {
    pizzas: [],
    additionalItems: [additionalItemMock],
    pizzaCounter: 0,
    newAddress: { street: "", building: "", flat: "" },
    deliveryMethod: "self-delivery",
    phone: "",
  },
  getters: Cart.getters,
  namespaced: true,
};

// Auth module
const AuthMock = {
  state: { isAuthenticated: true, user: userMock },
  namespaced: true,
};

// Profile module
const ProfileMock = {
  state: { addresses: [addressMock] },
  namespaced: true,
};

// Orders module
const OrdersMock = {
  state: { orders: [orderMock] },
  namespaced: true,
};

export const getVuexMock = ({
  authenticated = false,
  cartEmpty = false,
} = {}) => {
  return new Vuex.Store({
    modules: {
      Auth: authenticated
        ? cloneDeep(AuthMock)
        : { state: { isAuthenticated: false, user: null }, namespaced: true },
      Builder: cloneDeep(BuilderMock),
      Cart: cartEmpty ? EmptyCartMock : CartMock,
      Profile: authenticated
        ? cloneDeep(ProfileMock)
        : { state: { addresses: null }, namespaced: true },
      Orders: OrdersMock,
    },
  });
};
