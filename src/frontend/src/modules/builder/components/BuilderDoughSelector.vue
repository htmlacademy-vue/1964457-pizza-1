<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in doughs"
          :key="dough.id"
          class="dough__input"
          :class="getClassNameForDough(dough.name)"
        >
          <RadioButton
            className="visually-hidden"
            name="dough"
            :value="getInputValueForDough(dough.name)"
            :checked="selectedDough.id === dough.id"
            :obj="dough"
            @updateSelected="updateSelectedDough"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    doughs: {
      type: Array,
      required: true,
    },
    selectedDough: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getClassNameForDough(doughName) {
      switch (doughName) {
        case "Толстое":
          return "dough__input--large";
        case "Тонкое":
          return "dough__input--light";
        default:
          return "";
      }
    },
    getInputValueForDough(doughName) {
      switch (doughName) {
        case "Толстое":
          return "large";
        case "Тонкое":
          return "light";
        default:
          return "";
      }
    },
    updateSelectedDough(dough) {
      this.$emit("updateSelectedDough", dough);
    },
  },
};
</script>
