<template>
  <span
    class="filling"
    :class="getClassNameForIngredient()"
    :draggable="draggable"
    @dragstart="startDrag($event, ingredient)"
    >{{ ingredient.name }}</span
  >
</template>

<script>
export default {
  name: "UISelectorItem",
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
    startDrag(evt, ingredient) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("ingredientId", ingredient.id);
    },
  },
};
</script>
