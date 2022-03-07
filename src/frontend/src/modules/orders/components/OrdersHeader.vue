<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderId }} </b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <button
        type="button"
        class="button button--border"
        @click="deleteOrder()"
      >
        Удалить
      </button>
    </div>
    <div class="order__button">
      <button type="button" class="button" @click="repeatOrder">
        Повторить
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrdersHeader",
  props: {
    orderId: { type: Number, required: true },
    orderPrice: { type: Number, required: true },
  },
  methods: {
    preparePizzaPayload(pizza) {
      const name = pizza.name;
      const sauce = this.sauces.find((e) => pizza.sauceId === e.id);
      const pizzaDough = this.dough.find((e) => pizza.doughId === e.id);
      const size = this.sizes.find((e) => pizza.sizeId === e.id);
      const ingredients = pizza.ingredients.map((e) => {
        let obj = Object.assign({}, this.ingredients[e.ingredientId]);
        obj.count = e.quantity;
        return obj;
      });
      const price =
        (sauce.price +
          pizzaDough.price +
          ingredients
            .map((e) => e.price * e.count)
            .reduce((a, b) => a + b, 0)) *
        size.multiplier;
      const count = pizza.quantity;
      return {
        name,
        sauce,
        dough: pizzaDough,
        size,
        ingredients,
        price,
        count,
      };
    },
    async deleteOrder() {
      await this.$store.dispatch("Orders/deleteOrder", this.orderId);
    },
    repeatOrder() {
      this.$store.dispatch("Cart/resetState");
      const order = this.orders.find((e) => e.id === this.orderId);
      order.orderPizzas.forEach((pizza) => {
        this.$store.commit("Cart/addPizza", this.preparePizzaPayload(pizza));
      });
      if ("orderMisc" in order) {
        order.orderMisc
          .map((e) => ({ id: e.miscId, count: e.quantity }))
          .forEach((e) => this.$store.commit("Cart/setAdditionalItemCount", e));
      }
      const deliveryMethod = this.$store.getters["Cart/addresses"]
        .map((e) => e.id)
        .includes(order.addressId)
        ? order.addressId
        : "self-delivery";
      this.$store.commit("Cart/setDeliveryMethod", deliveryMethod);
      this.$store.commit("Cart/setPhone", order.phone);
      this.$router.push("/cart");
    },
  },
  computed: {
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredients"]),
    ...mapState("Orders", ["orders"]),
  },
};
</script>
