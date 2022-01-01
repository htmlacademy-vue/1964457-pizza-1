<template>
  <span
    class="filling"
    :class="getClassNameForIngredient()"
    :draggable="draggable"
    >{{ ingredient.name }}</span
  >
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    draggable: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getClassNameForIngredient() {
      const englishName = this.ingredient.image
        .replace(".svg", "")
        .split("/")
        .at(-1);
      return `filling--${englishName}`;
    },
  },
};
</script>
