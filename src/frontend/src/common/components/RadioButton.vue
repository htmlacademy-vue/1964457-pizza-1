<template>
  <input
    type="radio"
    :class="className"
    :name="name"
    :value="value"
    :checked="checked"
    @click="updateSelected"
  />
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateSelected() {
      this.$emit("updateSelected");
    },
  },
};
</script>
