<template>
  <div>
    <form
      action="test.html"
      method="post"
      class="layout-form"
      @submit.prevent="submitOrder"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>
          <div v-if="isCartEmpty">
            <div class="sheet cart__empty">
              <p>В корзине нет ни одного товара</p>
            </div>
          </div>
          <div v-else>
            <CartPizzaList />
            <CartAdditionalItems />
            <CartAddressForm />
          </div>
        </div>
        <div v-if="showPopup">
          <CartPopup @close="resetState" />
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <a
            href="#"
            class="button button--border button--arrow"
            @click="$router.push(`/`)"
            >Хочу еще одну</a
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтобы собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ cartPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button">Оформить заказ</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalItems from "@/modules/cart/components/CartAdditionalItems";
import CartAddressForm from "@/modules/cart/components/CartAddressForm";
import CartPopup from "@/modules/cart/components/CartPopup";
export default {
  name: "Cart",
  components: {
    CartPizzaList,
    CartAdditionalItems,
    CartAddressForm,
    CartPopup,
  },
  data() {
    return {
      showPopup: false,
    };
  },
  computed: {
    ...mapGetters("Cart", ["cartPrice"]),
    ...mapState("Cart", ["pizzas", "additionalItems"]),
    isCartEmpty() {
      return this.pizzas.length === 0;
    },
  },
  methods: {
    submitOrder() {
      this.showPopup = true;
    },
    resetState() {
      this.showPopup = false;
      this.$store.commit("Cart/resetState");
      this.$store.commit("Builder/resetState");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
