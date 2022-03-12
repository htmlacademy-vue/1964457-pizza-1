<template>
  <ul class="cart-list sheet">
    <li v-for="pizza in pizzas" :key="pizza.id" class="cart-list__item">
      <div class="product cart-list__product">
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
              <span name="size">{{ pizza.size.name }},</span>
              <span name="dough">
                Тесто: {{ pizza.dough.name.toLowerCase() }}
              </span>
            </li>
            <li>
              <span name="sauce">
                Соус: {{ pizza.sauce.name.toLowerCase() }}
              </span>
            </li>
            <li>
              <span name="ingredients">
                Начинка: {{ getIngredientNames(pizza) }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <CartItemCounter
        :current="pizza.count"
        @increase="increasePizzaCount(pizza.id)"
        @decrease="decreaseOrRemovePizza(pizza.id)"
      />
      <div class="cart-list__price">
        <b> {{ pizza.price * pizza.count }} ₽ </b>
      </div>

      <div class="cart-list__button">
        <button
          @click="editPizza(pizza.id)"
          type="button"
          class="cart-list__edit"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CartItemCounter from "./CartItemCounter.vue";
export default {
  name: "CartPizzaList",
  components: {
    CartItemCounter,
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Cart", ["cartPrice"]),
  },
  methods: {
    getIngredientNames(pizza) {
      return pizza.ingredients.map((i) => i.name.toLowerCase()).join(",");
    },
    increasePizzaCount(pizzaId) {
      this.$store.commit("Cart/increasePizzaCount", pizzaId);
    },
    decreaseOrRemovePizza(pizzaId) {
      const pizza = this.pizzas.find((x) => x.id === pizzaId);
      if (pizza.count > 1) {
        this.$store.commit("Cart/decreasePizzaCount", pizzaId);
      } else {
        this.$store.commit("Cart/removePizza", pizzaId);
        if (this.pizzas.length === 0) {
          // We`ve removed last pizza. Cleaning up additional items from cart
          this.$store.commit("Cart/resetState");
        }
      }
    },
    editPizza(pizzaId) {
      const pizza = this.pizzas.find((x) => x.id === pizzaId);
      this.$store.commit("Builder/setState", pizza);
      this.$router.push("/");
    },
  },
};
</script>
