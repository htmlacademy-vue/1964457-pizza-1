<template>
  <div class="content__result">
    <p>Итого {{ totalPrice }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
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
  },
};
</script>
