<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :doughs="pizza.dough"
          :selectedDough="selectedDough"
          @updateSelectedDough="updateSelectedDough"
        />
        <BuilderSizeSelector
          :sizes="pizza.sizes"
          :selectedSize="selectedSize"
          @updateSelectedSize="updateSelectedSize"
        />
        <BuilderIngredientsSelector
          :ingredients="pizza.ingredients"
          :sauces="pizza.sauces"
          :selectedSauce="selectedSauce"
          @updateSelectedSauce="updateSelectedSauce"
          @addIngredient="addIngredient"
          @removeIngredient="removeIngredient"
        />
        <BuilderPizzaView
          :selectedIngredients="selectedIngredients"
          :totalPrice="totalPrice"
        />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "AppLayoutMain",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      pizza,
      selectedDough: pizza.dough[0],
      selectedSize: pizza.sizes[0],
      selectedSauce: pizza.sauces[0],
      selectedIngredients: { ingredients: [], count: {} },
      totalPrice:
        (pizza.dough[0].price + pizza.sauces[0].price) *
        pizza.sizes[0].multiplier,
    };
  },
  methods: {
    updateSelectedDough(dough) {
      this.selectedDough = dough;
      this.totalPrice = this.calculateTotalPrice();
    },
    updateSelectedSize(size) {
      this.selectedSize = size;
      this.totalPrice = this.calculateTotalPrice();
    },
    updateSelectedSauce(sauce) {
      this.selectedSauce = sauce;
      this.totalPrice = this.calculateTotalPrice();
    },
    calculateIngredientPrice() {
      let price = 0;
      this.selectedIngredients.ingredients.forEach((ingredient) => {
        price +=
          ingredient.price * this.selectedIngredients.count[ingredient.id];
      });
      return price;
    },
    calculateTotalPrice() {
      const ingredientPrice = this.calculateIngredientPrice();
      const totalPrice =
        (ingredientPrice +
          this.selectedDough.price +
          this.selectedSauce.price) *
        this.selectedSize.multiplier;
      return totalPrice;
    },
    addIngredient(ingredient) {
      const idx = this.selectedIngredients.ingredients.indexOf(ingredient);
      if (idx === -1) {
        this.selectedIngredients.ingredients.push(ingredient);
        this.selectedIngredients.count[ingredient.id] = 1;
      } else {
        this.selectedIngredients.count[ingredient.id]++;
      }
      this.totalPrice = this.calculateTotalPrice();
    },
    removeIngredient(ingredient) {
      const idx = this.selectedIngredients.ingredients.indexOf(ingredient);
      if (idx > -1) {
        const ingredientId = this.selectedIngredients.ingredients[idx].id;
        if (this.selectedIngredients.count[ingredientId] === 1) {
          this.selectedIngredients.ingredients.splice(idx, 1);
          delete this.selectedIngredients.count[ingredientId];
        } else {
          this.selectedIngredients.count[ingredientId]--;
        }
        this.totalPrice = this.calculateTotalPrice();
      }
    },
  },
};
</script>

<style scoped></style>
