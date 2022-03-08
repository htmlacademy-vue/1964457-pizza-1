<template>
  <div class="content__pizza">
    <label class="input">
      <span>Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
      />
    </label>

    <div class="content__constructor">
      <div
        class="pizza"
        :class="foundationClassName"
        @drop="dropIngredient($event)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="pizza__wrapper">
          <transition-group name="ingredients">
            <div
              v-for="ingredientClass in ingredientClasses"
              :class="ingredientClass"
              :key="ingredientClass"
            ></div>
          </transition-group>
        </div>
      </div>
    </div>

    <BuilderPriceCounter :pizzaName="pizzaName" @addToCart="addToCart" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BuilderPriceCounter from "./BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
  },

  methods: {
    addToCart() {
      const payload = {
        id: this.pizzaId,
        name: this.pizzaName,
        sauce: this.selectedSauce,
        dough: this.selectedDough,
        size: this.selectedSize,
        ingredients: this.selectedIngredients,
        price: this.pizzaPrice,
        count: this.pizzaCount,
      };
      if (payload.id === 0) {
        // we adding new pizza
        this.$store.commit("Cart/addPizza", payload);
      } else {
        // we adding existing pizza
        this.$store.commit("Cart/updatePizza", payload);
      }

      this.$store.commit("Builder/resetState");
    },
    dropIngredient(evt) {
      const ingredientId = evt.dataTransfer.getData("ingredientId");
      this.$store.commit("Builder/addIngredient", ingredientId);
    },
  },
  computed: {
    ...mapState("Builder", [
      "selectedDough",
      "selectedSauce",
      "selectedSize",
      "pizzaName",
      "pizzaId",
      "pizzaCount",
    ]),
    ...mapGetters("Builder", ["selectedIngredients", "pizzaPrice"]),
    foundationClassName() {
      const dough = this.selectedDough.name === "Толстое" ? "big" : "small";
      const sauce =
        this.selectedSauce.name === "Томатный" ? "tomato" : "creamy";
      return `pizza--foundation--${dough}-${sauce}`;
    },
    pizzaName: {
      get() {
        return this.$store.state.Builder.pizzaName;
      },
      set(value) {
        this.$store.commit("Builder/setPizzaName", value);
      },
    },
    ingredientClasses() {
      let result = [];
      this.selectedIngredients.forEach((ingredient) => {
        const englishName = ingredient.image
          .replace(".svg", "")
          .split("/")
          .at(-1);
        switch (ingredient.count) {
          case 1:
            result.push(`pizza__filling pizza__filling--${englishName}`);
            break;
          case 2:
            result.push(`pizza__filling pizza__filling--${englishName}`);
            result.push(
              `pizza__filling pizza__filling--${englishName} pizza__filling--second`
            );
            break;
          case 3:
            result.push(`pizza__filling pizza__filling--${englishName}`);
            result.push(
              `pizza__filling pizza__filling--${englishName} pizza__filling--second`
            );
            result.push(
              `pizza__filling pizza__filling--${englishName} pizza__filling--third`
            );
            break;
        }
      });
      return result;
    },
  },
};
</script>
<style scoped>
.ingredients-item {
  display: inline-block;
  margin-right: 10px;
}
.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 1s;
}
.ingredients-enter, .ingredients-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
