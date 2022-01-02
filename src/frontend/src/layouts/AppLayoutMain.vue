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
          :ingredients="ingredients"
          :sauces="pizza.sauces"
          :selectedSauce="selectedSauce"
          @updateSelectedSauce="updateSelectedSauce"
          @addIngredient="addIngredient"
          @removeIngredient="removeIngredient"
        />
        <BuilderPizzaView
          :ingredients="ingredients"
          :totalPrice="totalPrice"
          :selectedDough="selectedDough"
          :selectedSauce="selectedSauce"
          @addToCart="addToCart"
          @addIngredient="addIngredient"
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
        ingredients: this.initIngredients(),
      };
    },
    initIngredients() {
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
    },
    updateSelectedSize(size) {
      this.selectedSize = size;
    },
    updateSelectedSauce(sauce) {
      this.selectedSauce = sauce;
    },
    calculateIngredientPrice() {
      let price = 0;
      Object.values(this.ingredients).forEach((ingredient) => {
        price += ingredient.price * ingredient.count;
      });
      return price;
    },
    addIngredient(ingredient) {
      this.ingredients[ingredient.id].count++;
    },
    removeIngredient(ingredient) {
      this.ingredients[ingredient.id].count--;
    },
    addToCart() {
      this.$emit("addToCart", this.totalPrice);
      Object.assign(this.$data, this.initialState());
    },
  },
  computed: {
    totalPrice() {
      return (
        (this.selectedDough.price +
          this.selectedSauce.price +
          this.calculateIngredientPrice()) *
        this.selectedSize.multiplier
      );
    },
  },
};
</script>

<style scoped></style>
