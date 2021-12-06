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
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in selectedIngredients.ingredients"
            class="pizza__filling"
            :class="getClassName(ingredient)"
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
  },
  methods: {
    getClassName(ingredient) {
      const englishName = ingredient.image
        .replace(".svg", "")
        .split("/")
        .at(-1);
      return `pizza__filling--${englishName}`;
    },
  },
};
</script>
