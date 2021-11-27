<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            class="radio ingredients__input"
            v-for="sauce in pizza.sauces"
            :key="sauce.id"
          >
            <RadioButton
              name="sauce"
              :value="getInputValueForSauce(sauce.name)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizza.ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <SelectorItem
                :className="getClassNameForIngredient(ingredient)"
                :ingridientName="ingredient.name"
              />
              <ItemCounter :name="getEnglishNameForIngridient(ingredient)" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
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
  data() {
    return {
      pizza,
    };
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
    getEnglishNameForIngridient(ingredient) {
      return ingredient.image.replace(".svg", "").split("/").at(-1);
    },
    getClassNameForIngredient(ingredient) {
      return `filling--${this.getEnglishNameForIngridient(ingredient)}`;
    },
  },
};
</script>
