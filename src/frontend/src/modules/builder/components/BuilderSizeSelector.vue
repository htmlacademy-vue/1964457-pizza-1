<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          :sizeid="size.id"
          class="diameter__input"
          :class="getClassNameForDiameter(size.name)"
        >
          <UIRadioButton
            class-name="visually-hidden"
            name="diameter"
            :value="getInputValueForDiameter(size.name)"
            :checked="size.id === selectedSize.id"
            @updateSelected="updateSelectedSize(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UIRadioButton from "@/common/components/UIRadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    UIRadioButton,
  },
  computed: {
    ...mapState("Builder", ["sizes", "selectedSize"]),
  },
  methods: {
    getClassNameForDiameter(diameter) {
      switch (diameter) {
        case "23 см":
          return "diameter__input--small";
        case "32 см":
          return "diameter__input--normal";
        case "45 см":
          return "diameter__input--big";
        default:
          return "";
      }
    },
    getInputValueForDiameter(diameter) {
      switch (diameter) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        case "45 см":
          return "big";
        default:
          return "";
      }
    },
    updateSelectedSize(size) {
      this.$store.commit("Builder/changeSelectedSize", size);
    },
  },
};
</script>
