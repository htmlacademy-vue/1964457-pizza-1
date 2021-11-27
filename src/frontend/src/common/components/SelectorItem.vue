<template>
  <span class="filling" :class="className">{{ ingridientName }}</span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    className: {
      type: String,
      default: "",
    },

    ingridientName: {
      type: String,
      required: true,
    },
  },
};
</script>
