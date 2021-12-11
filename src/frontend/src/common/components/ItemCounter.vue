<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="current <= min"
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
      class="counter__button counter__button--plus"
      :disabled="current >= max"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    obj: {
      type: Object,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    decrease() {
      this.current--;
      this.$emit("decrease", this.obj);
    },
    increase() {
      this.current++;
      this.$emit("increase", this.obj);
    },
  },
};
</script>
