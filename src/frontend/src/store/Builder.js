import pizza from "@/static/pizza.json";

const initIngredients = () => {
  const result = {};
  pizza.ingredients.forEach((ingredient) => {
    result[ingredient.id] = {
      id: ingredient.id,
      name: ingredient.name,
      image: ingredient.image,
      price: ingredient.price,
      count: 0,
    };
  });
  return result;
};

const getInitialState = () => {
  return {
    pizza,
    selectedDough: pizza.dough[0],
    selectedSize: pizza.sizes[0],
    selectedSauce: pizza.sauces[0],
    ingredients: initIngredients(),
    pizzaName: "",
  };
};

export default {
  namespaced: true,
  state: getInitialState(),
  getters: {
    selectedIngredients(state) {
      return Object.values(state.ingredients).filter(
        (ingredient) => ingredient.count > 0
      );
    },
    pizzaPrice(state, getters) {
      let ingredientPrice = 0;
      if (getters.selectedIngredients.length > 0) {
        ingredientPrice = getters.selectedIngredients
          .map((ingredient) => ingredient.count * ingredient.price)
          .reduce((a, b) => a + b);
      }
      console.log(ingredientPrice);
      return (
        (ingredientPrice +
          state.selectedDough.price +
          state.selectedSauce.price) *
        state.selectedSize.multiplier
      );
    },
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getInitialState());
    },
    changeSelectedDough(state, payload) {
      state.selectedDough = payload;
    },
    changeSelectedSize(state, payload) {
      state.selectedSize = payload;
    },
    changeSelectedSauce(state, payload) {
      state.selectedSauce = payload;
    },
    addIngredient(state, payload) {
      state.ingredients[payload].count++;
    },
    removeIngredient(state, payload) {
      state.ingredients[payload].count--;
    },
    setState(state, payload) {
      state.selectedDough = payload.dough;
      state.selectedSize = payload.size;
      state.selectedSauce = payload.sauce;
      state.pizzaName = payload.name;
      payload.ingredients.forEach((i) => {
        state.ingredients[i.id].count = i.count;
      });
    },
    setPizzaName(state, payload) {
      state.pizzaName = payload;
    },
  },
  actions: {},
};
