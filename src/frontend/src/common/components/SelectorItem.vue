<template>
  <span class="filling" :class="className">{{ ingredientName }}</span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    className: {
      type: String,
      default: "",
    },

    ingredientName: {
      type: String,
      required: true,
    },
  },
};
</script>
