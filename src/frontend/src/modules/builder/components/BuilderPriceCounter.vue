<template>
  <div class="content__result">
    <p>Итого {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isButtonDisabled"
      @click="$emit(`addToCart`)"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BuilderPriceCounter",
  props: {
    pizzaName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Builder", ["selectedIngredients", "pizzaPrice"]),
    isButtonDisabled() {
      return (
        this.selectedIngredients.length === 0 || this.pizzaName.length === 0
      );
    },
  },
};
</script>

<style lang="postcss" scoped></style>
