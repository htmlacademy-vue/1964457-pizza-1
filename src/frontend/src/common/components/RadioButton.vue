<template>
  <input type="radio" :class="className" :name="name" :value="value" />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    className: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
