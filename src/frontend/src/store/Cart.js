import Vue from "vue";

const initAdditionalItems = (misc) => {
  return misc.map((i) => ({
    id: i.id,
    name: i.name,
    image: i.image,
    price: i.price,
    count: 0,
  }));
};

export default {
  namespaced: true,
  state: {
    pizzas: [],
    additionalItems: [],
    pizzaCounter: 0,
    newAddress: { street: "", building: "", flat: "" },
    deliveryMethod: "self-delivery",
    phone: "",
  },
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
    addresses(state, getters, rootState) {
      let addresses = [
        {
          name: "Заберу сам",
          street: "",
          building: "",
          comment: "",
          id: "self-delivery",
        },
        {
          name: "Новый адрес",
          street: "",
          building: "",
          comment: "",
          id: "new-address",
        },
      ];
      if (rootState.Auth.isAuthenticated) {
        addresses = addresses.concat(rootState.Profile.addresses);
      }
      return addresses;
    },
  },
  mutations: {
    setAdditionalItems(state, payload) {
      state.additionalItems = initAdditionalItems(payload);
    },
    addPizza(state, payload) {
      payload.id = state.pizzaCounter + 1;
      state.pizzas.push(payload);
      state.pizzaCounter++;
    },
    updatePizza(state, payload) {
      const index = state.pizzas.findIndex((x) => x.id === payload.id);
      if (index === -1) {
        console.error(`Cant find pizza id ${payload.id} in state.pizzas`);
      } else {
        Vue.set(state.pizzas, index, payload);
      }
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
    increaseAdditionalItemCount(state, payload) {
      state.additionalItems.find((x) => x.id === payload).count++;
    },
    decreaseAdditionalItemCount(state, payload) {
      state.additionalItems.find((x) => x.id === payload).count--;
    },
    setAdditionalItemCount(state, payload) {
      state.additionalItems.find((x) => x.id === payload.id).count =
        payload.count;
    },
    resetCart(state) {
      state.pizzas = [];
      state.additionalItems.forEach((el) => {
        if (el.count > 0) {
          el.count = 0;
        }
      });
      state.pizzaCounter = 0;
      state.newAddress = { street: "", building: "", flat: "" };
      state.deliveryMethod = "self-delivery";
    },
    setPhone(state, payload) {
      state.phone = payload;
    },
    newAddressSetStreet(state, payload) {
      state.newAddress.street = payload;
    },
    newAddressSetBuilding(state, payload) {
      state.newAddress.building = payload;
    },
    newAddressSetFlat(state, payload) {
      state.newAddress.flat = payload;
    },
    setDeliveryMethod(state, payload) {
      state.deliveryMethod = payload;
    },
  },
  actions: {
    resetState({ commit, dispatch }) {
      dispatch("setPhone");
      commit("resetCart");
    },
    setPhone({ rootState, commit }) {
      if (rootState.Auth.isAuthenticated) {
        commit("setPhone", rootState.Auth.user.phone);
      } else {
        commit("setPhone", "");
      }
    },
  },
};
