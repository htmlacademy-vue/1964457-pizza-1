<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizza.sizes"
          :key="size.id"
          class="diameter__input"
          :class="getClassNameForDiameter(size.name)"
        >
          <RadioButton
            className="visually-hidden"
            name="diameter"
            :value="getInputValueForDiameter(size.name)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import pizza from "@/static/pizza.json";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      pizza,
    };
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
  },
};
</script>
