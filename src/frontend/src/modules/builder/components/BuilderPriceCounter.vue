<template>
  <div class="content__result">
    <p>Итого {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="
        Object.values(ingredients).every((e) => e.count === 0) ||
        pizzaName.length === 0
      "
      @click="$emit(`addToCart`)"
    >
      Готовьте!
    </button>
  </div>
</template>
<style lang="postcss" scoped></style>
<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Object,
      required: true,
    },
  },
};
</script>
