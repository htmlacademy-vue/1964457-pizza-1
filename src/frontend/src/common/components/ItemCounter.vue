<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="counter" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import EventBus from "@/common/EventBus";

export default {
  name: "ItemCounter",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increase() {
      this.counter++;
      if (this.counter == 1) {
        EventBus.$emit("addIncredient", this.name);
      }
    },
    decrease() {
      if (this.counter > 0) {
        this.counter--;
      }
      if (this.counter == 0) {
        EventBus.$emit("removeIncredient", this.name);
      }
    },
  },
};
</script>
