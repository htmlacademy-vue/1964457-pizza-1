import misc from "@/static/misc.json";

const initAdditionalItems = () => {
  return misc.map((i) => ({
    id: i.id,
    name: i.name,
    image: i.image,
    price: i.price,
    count: 1,
  }));
};

const getInitialState = () => {
  return {
    pizzas: [],
    additionalItems: initAdditionalItems(),
    pizzaCounter: 0,
  };
};

export default {
  namespaced: true,
  state: getInitialState(),
  getters: {
    cartPrice(state) {
      let pizzasPrice = 0;
      if (state.pizzas.length > 0) {
        pizzasPrice = state.pizzas
          .map((pizza) => pizza.price * pizza.count)
          .reduce((a, b) => a + b);
      }
      let additionalItemsPrice = 0;
      if (state.additionalItems.length > 0) {
        additionalItemsPrice = state.additionalItems
          .map((i) => i.price * i.count)
          .reduce((a, b) => a + b);
      }
      return pizzasPrice + additionalItemsPrice;
    },
  },
  mutations: {
    addPizza(state, payload) {
      const pizzaId = state.pizzaCounter + 1;
      state.pizzas.push({
        id: pizzaId,
        name: payload.name,
        sauce: payload.sauce,
        size: payload.size,
        dough: payload.dough,
        ingredients: payload.ingredients,
        price: payload.price,
        count: 1,
      });
      state.pizzaCounter++;
    },
    removePizza(state, payload) {
      const index = state.pizzas.findIndex((x) => x.id === payload);
      if (index > -1) {
        state.pizzas.splice(index, 1);
      }
    },
    increasePizzaCount(state, payload) {
      state.pizzas.find((x) => x.id === payload).count++;
    },
    decreasePizzaCount(state, payload) {
      state.pizzas.find((x) => x.id === payload).count--;
    },
    removeAdditionalItem(state, payload) {
      const index = state.additionalItems.findIndex((x) => x.id === payload);
      if (index > -1) {
        state.additionalItems.splice(index, 1);
      }
    },
    increaseAdditionalItemCount(state, payload) {
      state.additionalItems.find((x) => x.id === payload).count++;
    },
    decreaseAdditionalItemCount(state, payload) {
      state.additionalItems.find((x) => x.id === payload).count--;
    },
    resetState(state) {
      Object.assign(state, getInitialState());
    },
  },
  actions: {},
};
