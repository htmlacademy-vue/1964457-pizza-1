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
      <button type="button" class="button">Повторить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrdersHeader",
  props: {
    orderId: { type: Number, required: true },
    orderPrice: { type: Number, required: true },
  },
  methods: {
    async deleteOrder() {
      await this.$store.dispatch("Orders/deleteOrder", this.orderId);
    },
  },
};
</script>
