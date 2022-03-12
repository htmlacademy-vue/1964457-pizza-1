import { cloneDeep } from "lodash";

import Builder from "@/store/Builder.js";
import Vuex from "vuex";

// Builder module
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

export const getVuexMock = () => {
  return new Vuex.Store({
    modules: {
      Builder: cloneDeep(BuilderMock),
    },
  });
};
