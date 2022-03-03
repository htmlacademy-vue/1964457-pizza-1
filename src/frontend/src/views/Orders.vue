<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <section v-for="order in orders" :key="order.id" class="sheet order">
      <OrdersHeader :orderId="order.id" :orderPrice="getOrderPrice(order)" />
      <ul class="order__list">
        <OrdersPizza
          v-for="pizza in order.orderPizzas"
          :key="pizza.id"
          :pizza="pizza"
        />
      </ul>
      <ul v-if="'orderMisc' in order" class="order__additional">
        <OrdersMisc
          v-for="misc in order.orderMisc"
          :key="misc.miscId"
          :misc="misc"
        />
      </ul>

      <p class="order__address">Адрес доставки: {{ getOrderAddress(order) }}</p>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrdersHeader from "@/modules/orders/components/OrdersHeader";
import OrdersPizza from "@/modules/orders/components/OrdersPizza";
import OrdersMisc from "@/modules/orders/components/OrdersMisc";

export default {
  name: "Orders",
  components: {
    OrdersHeader,
    OrdersPizza,
    OrdersMisc,
  },
  methods: {
    getPizzaPrice(pizza) {
      const sauce = this.sauces.find((e) => pizza.sauceId === e.id);
      const size = this.sizes.find((e) => pizza.sizeId === e.id);
      const pizzaDough = this.dough.find((e) => pizza.doughId === e.id);
      const ingredientIds = pizza.ingredients.map((e) => e.ingredientId);
      const ingredientsPrice = this.ingredientsArray
        .filter((e) => ingredientIds.includes(e.id))
        .map((e) => e.price)
        .reduce((a, b) => a + b, 0);
      return (
        (ingredientsPrice + pizzaDough.price + sauce.price) *
        size.multiplier *
        pizza.quantity
      );
    },
    getMiscPrice(misc) {
      return (
        this.additionalItems.find((e) => misc.miscId === e.id).price *
        misc.quantity
      );
    },
    getOrderPrice(order) {
      const pizzasPrice = order.orderPizzas
        .map((e) => this.getPizzaPrice(e))
        .reduce((a, b) => a + b, 0);
      const miscPrice =
        "orderMisc" in order
          ? order.orderMisc
              .map((e) => this.getMiscPrice(e))
              .reduce((a, b) => a + b, 0)
          : 0;
      return pizzasPrice + miscPrice;
    },
    getOrderAddress(order) {
      return "orderAddress" in order ? order.orderAddress.name : "Самовывоз";
    },
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredientsArray"]),
    ...mapState("Cart", ["additionalItems"]),
  },
};
</script>

<style scoped></style>
