<template>
  <li class="order__item">
    <div class="product">
      <img
        src="img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>
            {{ size.name }},
            {{
              pizzaDough.name.toLowerCase() === "тонкое"
                ? "на тонком тесте"
                : "на толстом тесте"
            }}
          </li>
          <li>Соус: {{ sauce.name.toLowerCase() }}</li>
          <li>
            Начинка:
            {{ ingredients.map((e) => e.name.toLowerCase()).join(", ") }}
          </li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ pizzaPrice }}</p>
  </li>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "OrdersPizza",
  props: {
    pizza: { type: Object, required: true },
  },
  computed: {
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredientsArray"]),
    ingredientIds() {
      return this.pizza.ingredients.map((e) => e.ingredientId);
    },
    ingredients() {
      return this.ingredientsArray.filter((e) =>
        this.ingredientIds.includes(e.id)
      );
    },
    sauce() {
      return this.sauces.find((e) => this.pizza.sauceId === e.id);
    },
    size() {
      return this.sizes.find((e) => this.pizza.sizeId === e.id);
    },
    pizzaDough() {
      return this.dough.find((e) => this.pizza.doughId === e.id);
    },
    pizzaPrice() {
      const price =
        (this.ingredients.map((e) => e.price).reduce((a, b) => a + b, 0) +
          this.pizzaDough.price +
          this.sauce.price) *
        this.size.multiplier;
      return this.pizza.quantity > 1
        ? `${this.pizza.quantity}x${price} ₽`
        : `${price} ₽`;
    },
  },
};
</script>
