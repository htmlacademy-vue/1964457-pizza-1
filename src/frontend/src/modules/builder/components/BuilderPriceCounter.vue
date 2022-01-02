<template>
  <div class="content__result">
    <p>Итого {{ totalPrice }} ₽</p>
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
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.ingredients).every((e) => e.count === 0) ||
        this.pizzaName.length === 0
      );
    },
  },
};
</script>

<style lang="postcss" scoped></style>
