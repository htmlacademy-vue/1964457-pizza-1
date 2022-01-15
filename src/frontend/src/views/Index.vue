<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector />
        <BuilderSizeSelector />
        <BuilderIngredientsSelector />
        <BuilderPizzaView />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  methods: {
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
