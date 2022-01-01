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
          :selectedIngredients="selectedIngredients"
          :sauces="pizza.sauces"
          :selectedSauce="selectedSauce"
          @updateSelectedSauce="updateSelectedSauce"
          @addIngredient="addIngredient"
          @removeIngredient="removeIngredient"
        />
        <BuilderPizzaView
          :selectedIngredients="selectedIngredients"
          :totalPrice="totalPrice"
          :selectedDough="selectedDough"
          :selectedSauce="selectedSauce"
          @addToCart="addToCart"
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
    return this.initialState();
  },
  methods: {
    initialState() {
      return {
        pizza,
        selectedDough: pizza.dough[0],
        selectedSize: pizza.sizes[0],
        selectedSauce: pizza.sauces[0],
        selectedIngredients: this.initSelectedIngredients(),
        totalPrice:
          (pizza.dough[0].price + pizza.sauces[0].price) *
          pizza.sizes[0].multiplier,
      };
    },
    initSelectedIngredients() {
      const result = {};
      pizza.ingredients.forEach((ingredient) => {
        result[ingredient.id] = {
          id: ingredient.id,
          name: ingredient.name,
          image: ingredient.image,
          price: ingredient.price,
          count: 0,
        };
      });
      return result;
    },
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
      Object.values(this.selectedIngredients).forEach((ingredient) => {
        price += ingredient.price * ingredient.count;
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
      this.selectedIngredients[ingredient.id].count++;
      this.totalPrice = this.calculateTotalPrice();
    },
    removeIngredient(ingredient) {
      this.selectedIngredients[ingredient.id].count--;
      this.totalPrice = this.calculateTotalPrice();
    },
    addToCart() {
      this.$emit("addToCart", this.totalPrice);
      Object.assign(this.$data, this.initialState());
    },
  },
};
</script>

<style scoped></style>
