<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            class="radio ingredients__input"
            v-for="sauce in sauces"
            :sauceid="sauce.id"
            :key="sauce.id"
          >
            <UIRadioButton
              name="sauce"
              :value="getInputValueForSauce(sauce.name)"
              :checked="sauce.id === selectedSauce.id"
              @updateSelected="updateSelectedSauce(sauce)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <UISelectorItem
                :ingredient="ingredient"
                :draggable="ingredients[ingredient.id].count < 3"
              />
              <UIItemCounter
                :max="3"
                :min="0"
                :current="ingredients[ingredient.id].count"
                @increase="addIngredient(ingredient.id)"
                @decrease="removeIngredient(ingredient.id)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import UIRadioButton from "@/common/components/UIRadioButton";
import UISelectorItem from "@/common/components/UISelectorItem";
import UIItemCounter from "@/common/components/UIItemCounter";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    UIRadioButton,
    UISelectorItem,
    UIItemCounter,
  },
  methods: {
    getInputValueForSauce(sauceName) {
      switch (sauceName) {
        case "Томатный":
          return "tomato";
        case "Сливочный":
          return "creamy";
        default:
          return "";
      }
    },
    updateSelectedSauce(sauce) {
      this.$store.commit("Builder/changeSelectedSauce", sauce);
    },
    addIngredient(ingredientId) {
      this.$store.commit("Builder/addIngredient", ingredientId);
    },
    removeIngredient(ingredientId) {
      this.$store.commit("Builder/removeIngredient", ingredientId);
    },
  },
  computed: {
    ...mapState("Builder", ["sauces", "selectedSauce", "ingredients"]),
  },
};
</script>
