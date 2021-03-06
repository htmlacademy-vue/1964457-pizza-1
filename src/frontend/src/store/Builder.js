const initIngredients = (ingredients) => {
  const result = {};
  ingredients.forEach((ingredient) => {
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

export default {
  namespaced: true,
  state: {
    dough: [],
    sizes: [],
    sauces: [],
    selectedDough: "",
    selectedSize: "",
    selectedSauce: "",
    ingredients: {},
    ingredientsArray: [],
    pizzaName: "",
    pizzaId: 0,
    pizzaCount: 1,
  },
  getters: {
    selectedIngredients(state) {
      return Object.values(state.ingredients).filter(
        (ingredient) => ingredient.count > 0
      );
    },
    ingredientPrice(state, getters) {
      let ingredientPrice = 0;
      if (getters.selectedIngredients.length > 0) {
        ingredientPrice = getters.selectedIngredients
          .map((ingredient) => ingredient.count * ingredient.price)
          .reduce((a, b) => a + b);
      }
      return ingredientPrice;
    },
    pizzaPrice(state, getters) {
      const result =
        (getters.ingredientPrice +
          state.selectedDough.price +
          state.selectedSauce.price) *
        state.selectedSize.multiplier;
      return result;
    },
  },

  mutations: {
    initSizes(state, payload) {
      state.sizes = payload;
      state.selectedSize = payload[0];
    },
    initDough(state, payload) {
      state.dough = payload;
      state.selectedDough = payload[0];
    },
    initIngredients(state, payload) {
      state.ingredients = initIngredients(payload);
      state.ingredientsArray = payload;
    },
    initSauces(state, payload) {
      state.sauces = payload;
      state.selectedSauce = payload[0];
    },
    resetState(state) {
      state.selectedDough = state.dough[0];
      state.selectedSize = state.sizes[0];
      state.selectedSauce = state.sauces[0];
      state.ingredients = initIngredients(state.ingredientsArray);
      state.pizzaName = "";
      state.pizzaId = 0;
      state.pizzaCount = 1;
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
      state.pizzaName = payload.name;
      state.pizzaId = payload.id;
      state.pizzaCount = payload.count;
      state.selectedDough = payload.dough;
      state.selectedSize = payload.size;
      state.selectedSauce = payload.sauce;
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
