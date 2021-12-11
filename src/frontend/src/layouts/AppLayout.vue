<template>
  <div class="app-layout">
    <AppLayoutHeader :cartPrice="cartPrice" />
    <AppLayoutMain @addToCart="addToCart" />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutMain from "@/layouts/AppLayoutMain";

export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
    AppLayoutMain,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  methods: {
    addToCart(totalPrice) {
      this.cartPrice += totalPrice;
      console.log(this.cartPrice)
    },
  },
};
</script>
