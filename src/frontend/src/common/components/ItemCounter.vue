<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="counter <= min"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="counter" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="counter >= max"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  data() {
    return {
      counter: 0,
    };
  },
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
  },
  methods: {
    decrease() {
      this.counter--;
      this.$emit("decrease", this.obj);
    },
    increase() {
      this.counter++;
      this.$emit("increase", this.obj);
    },
  },
};
</script>
