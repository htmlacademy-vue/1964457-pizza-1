export default {
  namespaced: true,
  state: {
    totalPrice: 0,
    pizzas: [],
    pizzaCounter: 0,
  },
  getters: {
    cartPrice(state) {
      if (Object.keys(state.pizzas).length === 0) {
        return 0;
      }
      return Object.values(state.pizzas)
        .map((pizza) => pizza.price * pizza.count)
        .reduce((a, b) => a + b);
    },
  },
  mutations: {
    incrementTotalPrice(state, payload) {
      state.totalPrice += payload;
    },
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
  },
  actions: {},
};
