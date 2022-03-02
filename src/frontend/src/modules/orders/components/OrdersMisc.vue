<template>
  <li>
    <img
      :src="additionalItem.image"
      width="20"
      height="30"
      :alt="additionalItem.name"
    />
    <p>
      <span>{{ additionalItem.name }}</span>
      <b>{{ price }}</b>
    </p>
  </li>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "OrdersMisc",
  props: {
    misc: { type: Object, required: true },
  },
  computed: {
    ...mapState("Cart", ["additionalItems"]),
    additionalItem() {
      return this.additionalItems.find((e) => this.misc.miscId === e.id);
    },
    price() {
      return this.misc.quantity > 1
        ? `${this.misc.quantity}x${this.additionalItem.price} ₽`
        : `${this.additionalItem.price} ₽`;
    },
  },
};
</script>
