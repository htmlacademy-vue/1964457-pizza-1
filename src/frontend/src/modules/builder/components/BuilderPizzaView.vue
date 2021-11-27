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
            v-for="ingredient in ingredients"
            class="pizza__filling"
            :class="getClassName(ingredient)"
            :key="ingredient"
          ></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter";
import EventBus from "@/common/EventBus";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },
  data() {
    return {
      ingredients: [],
    };
  },
  methods: {
    getClassName(ingridientName) {
      return "pizza__filling--" + ingridientName;
    },
  },
  mounted() {
    EventBus.$on("addIncredient", (ingredientName) => {
      if (!this.ingredients.includes(ingredientName)) {
        this.ingredients.push(ingredientName);
      }
    });
    EventBus.$on("removeIncredient", (ingredientName) => {
      const index = this.ingredients.indexOf(ingredientName);
      if (index > -1) {
        this.ingredients.splice(index, 1);
      }
    });
  },
};
</script>
