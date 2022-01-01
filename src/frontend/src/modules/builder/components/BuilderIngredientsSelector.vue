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
            :key="sauce.id"
          >
            <RadioButton
              name="sauce"
              :value="getInputValueForSauce(sauce.name)"
              :checked="sauce.id === selectedSauce.id"
              :obj="sauce"
              @updateSelected="updateSelectedSauce"
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
              <SelectorItem
                :ingredient="ingredient"
                :draggable="selectedIngredients[ingredient.id].count < 3"
              />
              <ItemCounter
                :obj="ingredient"
                :max="3"
                :min="0"
                :current="selectedIngredients[ingredient.id].count"
                @increase="addIngredient"
                @decrease="removeIngredient"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    SelectorItem,
    ItemCounter,
  },
  props: {
    ingredients: {
      type: Array,
      requried: true,
    },
    selectedIngredients: {
      type: Object,
      requried: true,
    },
    sauces: {
      type: Array,
      requried: true,
    },
    selectedSauce: {
      type: Object,
      requried: true,
    },
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
      this.$emit("updateSelectedSauce", sauce);
    },
    addIngredient(ingredient) {
      this.$emit("addIngredient", ingredient);
    },
    removeIngredient(ingredient) {
      this.$emit("removeIngredient", ingredient);
    },
  },
};
</script>
