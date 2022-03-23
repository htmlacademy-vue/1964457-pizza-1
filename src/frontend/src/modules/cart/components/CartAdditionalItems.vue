<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="item in additionalItems"
        :key="item.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img :src="item.image" width="39" height="60" :alt="item.name" />
          <span>{{ item.name }}</span>
        </p>
        <CartAdditionalItemCounter
          :min="0"
          :item="item"
          @increase="increaseItemCount(item.id)"
          @decrease="decreaseItemCount(item.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartAdditionalItemCounter from "./CartAdditionalItemCounter.vue";
export default {
  name: "CartAdditionalItems",
  components: {
    CartAdditionalItemCounter,
  },
  computed: {
    ...mapState("Cart", ["additionalItems"]),
  },
  methods: {
    increaseItemCount(itemId) {
      this.$store.commit("Cart/increaseAdditionalItemCount", itemId);
    },
    decreaseItemCount(itemId) {
      const item = this.additionalItems.find((x) => x.id === itemId);
      if (item.count >= 1) {
        this.$store.commit("Cart/decreaseAdditionalItemCount", itemId);
      }
    },
  },
};
</script>
