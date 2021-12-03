<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :pizza="pizza"
          :selectedDough="selectedDough"
          @updateSelectedDough="updateSelectedDough"
        />
        <BuilderSizeSelector
          :pizza="pizza"
          :selectedSize="selectedSize"
          @updateSelectedSize="updateSelectedSize"
        />
        <BuilderIngredientsSelector
          :pizza="pizza"
          :selectedSauce="selectedSauce"
          @updateSelectedSauce="updateSelectedSauce"
          @increaseIngredientPrice="increaseIngredientPrice"
          @decreaseIngredientPrice="decreaseIngredientPrice"
        />
        <!-- <BuilderPizzaView :pizza="pizza" /> -->
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
// import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "AppLayoutMain",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    // BuilderPizzaView,
  },
  data() {
    return {
      pizza,
      selectedDough: pizza.dough[0],
      selectedSize: pizza.sizes[0],
      ingredientPrice: 0,
      selectedSauce: pizza.sauces[0],
    };
  },

  methods: {
    updateSelectedDough(dough) {
      this.selectedDough = dough;
    },
    updateSelectedSize(size) {
      this.selectedSize = size;
    },
    updateSelectedSauce(sauce) {
      this.selectedSauce = sauce;
    },
    increaseIngredientPrice(price) {
      this.ingredientPrice += price;
      console.log(this.ingredientPrice);
    },
    decreaseIngredientPrice(price) {
      this.ingredientPrice -= price;
      console.log(this.ingredientPrice);
    },
  },
};
</script>

<style scoped></style>
