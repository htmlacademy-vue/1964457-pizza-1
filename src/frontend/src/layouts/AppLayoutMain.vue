<template>
  <div class="app-layout">
    <AppLayoutHeader :cartPrice="cartPrice" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  methods: {
    addToCart(totalPrice) {
      this.cartPrice += totalPrice;
    },
  },
};
</script>
