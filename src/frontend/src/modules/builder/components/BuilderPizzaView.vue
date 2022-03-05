<template>
  <div class="content__pizza">
    <label class="input">
      <span>Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
      />
    </label>

    <div class="content__constructor">
      <div
        class="pizza"
        :class="foundationClassName"
        @drop="dropIngredient($event)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in selectedIngredients"
            v-html="getIngredientElements(ingredient)"
            :key="ingredient.id"
          ></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter :pizzaName="pizzaName" @addToCart="addToCart" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BuilderPriceCounter from "./BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },

  methods: {
    getIngredientElements(ingredient) {
      const englishName = ingredient.image
        .replace(".svg", "")
        .split("/")
        .at(-1);
      switch (ingredient.count) {
        case 1:
          return `<div class="pizza__filling pizza__filling--${englishName}"></div>`;
        case 2:
          return `<div class="pizza__filling pizza__filling--${englishName}"></div>
                  <div class="pizza__filling pizza__filling--${englishName} pizza__filling--second"></div>`;
        case 3:
          return `<div class="pizza__filling pizza__filling--${englishName}"></div>
                  <div class="pizza__filling pizza__filling--${englishName} pizza__filling--second"></div>
                  <div class="pizza__filling pizza__filling--${englishName} pizza__filling--third"></div>`;
      }
    },

    addToCart() {
      const payload = {
        id: this.pizzaId,
        name: this.pizzaName,
        sauce: this.selectedSauce,
        dough: this.selectedDough,
        size: this.selectedSize,
        ingredients: this.selectedIngredients,
        price: this.pizzaPrice,
        count: this.pizzaCount,
      };
      if (payload.id === 0) {
        // we adding new pizza
        this.$store.commit("Cart/addPizza", payload);
      } else {
        // we adding existing pizza
        this.$store.commit("Cart/updatePizza", payload);
      }

      this.$store.commit("Builder/resetState");
    },
    dropIngredient(evt) {
      const ingredientId = evt.dataTransfer.getData("ingredientId");
      this.$store.commit("Builder/addIngredient", ingredientId);
    },
  },
  computed: {
    ...mapState("Builder", [
      "selectedDough",
      "selectedSauce",
      "selectedSize",
      "pizzaName",
      "pizzaId",
      "pizzaCount",
    ]),
    ...mapGetters("Builder", ["selectedIngredients", "pizzaPrice"]),
    foundationClassName() {
      const dough = this.selectedDough.name === "Толстое" ? "big" : "small";
      const sauce =
        this.selectedSauce.name === "Томатный" ? "tomato" : "creamy";
      return `pizza--foundation--${dough}-${sauce}`;
    },
    pizzaName: {
      get() {
        return this.$store.state.Builder.pizzaName;
      },
      set(value) {
        this.$store.commit("Builder/setPizzaName", value);
      },
    },
  },
};
</script>
