<template>
  <div class="counter cart-list__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="current"
      readonly="readonly"
    />
    <button
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CartItemCounter",
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    decrease() {
      this.$emit("decrease");
    },
    increase() {
      this.$emit("increase");
    },
  },
};
</script>
