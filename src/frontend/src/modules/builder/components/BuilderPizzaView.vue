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
            class="pizza__filling"
            :class="getFilingClassName(ingredient)"
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
  data() {
    return {
      pizzaName: "",
    };
  },

  methods: {
    getFilingClassName(ingredient) {
      const englishName = ingredient.image
        .replace(".svg", "")
        .split("/")
        .at(-1);
      switch (ingredient.count) {
        case 1:
          return `pizza__filling--${englishName}`;
        case 2:
          return `pizza__filling--${englishName} pizza__filling--second`;
        case 3:
          return `pizza__filling--${englishName} pizza__filling--third`;
      }
    },
    addToCart() {
      this.pizzaName = "";
      this.$store.commit("Cart/incrementTotalPrice", this.pizzaPrice);
      this.$store.commit("Builder/resetState");
    },
    dropIngredient(evt) {
      const ingredientId = evt.dataTransfer.getData("ingredientId");
      this.$store.commit("Builder/addIngredient", ingredientId);
    },
  },
  computed: {
    ...mapState("Builder", ["selectedDough", "selectedSauce"]),
    ...mapGetters("Builder", ["selectedIngredients", "pizzaPrice"]),
    foundationClassName() {
      const dough = this.selectedDough.name === "Толстое" ? "big" : "small";
      const sauce =
        this.selectedSauce.name === "Томатный" ? "tomato" : "creamy";
      return `pizza--foundation--${dough}-${sauce}`;
    },
  },
};
</script>
