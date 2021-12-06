<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="getFoundationClassName()">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in selectedIngredients.ingredients"
            class="pizza__filling"
            :class="getFilingClassName(ingredient)"
            :key="ingredient.id"
          ></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter :totalPrice="totalPrice" />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  props: {
    selectedIngredients: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    selectedDough: {
      type: Object,
      required: true,
    },
    selectedSauce: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getFoundationClassName() {
      const dough = this.selectedDough.name === "Толстое" ? "big" : "small";
      const sauce =
        this.selectedSauce.name === "Томатный" ? "tomato" : "creamy";
      return `pizza--foundation--${dough}-${sauce}`;
    },
    getFilingClassName(ingredient) {
      const englishName = ingredient.image
        .replace(".svg", "")
        .split("/")
        .at(-1);
      const count = this.selectedIngredients.count[ingredient.id];
      switch (count) {
        case 1:
          return `pizza__filling--${englishName}`;
        case 2:
          return `pizza__filling--${englishName} pizza__filling--second`;
        case 3:
          return `pizza__filling--${englishName} pizza__filling--third`;
      }
    },
  },
};
</script>
