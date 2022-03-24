<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="d in dough"
          :key="d.id"
          :doughid="d.id"
          class="dough__input"
          :class="getClassNameForDough(d.name)"
        >
          <UIRadioButton
            class-name="visually-hidden"
            name="dough"
            :value="getInputValueForDough(d.name)"
            :checked="selectedDough.id === d.id"
            @updateSelected="updateSelected(d)"
          />
          <b>{{ d.name }}</b>
          <span>{{ d.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UIRadioButton from "@/common/components/UIRadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    UIRadioButton,
  },
  computed: {
    ...mapState("Builder", ["selectedDough", "dough"]),
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
    updateSelected(dough) {
      this.$store.commit("Builder/changeSelectedDough", dough);
    },
  },
};
</script>
