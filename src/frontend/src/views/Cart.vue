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
          <button type="submit" class="button" :disabled="isCartEmpty">
            Оформить заказ
          </button>
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
    ...mapGetters("Cart", ["cartPrice", "addresses"]),
    ...mapState("Cart", [
      "pizzas",
      "additionalItems",
      "deliveryMethod",
      "newAddress",
    ]),
    ...mapState("Auth", ["isAuthenticated", "user"]),
    isCartEmpty() {
      return this.pizzas.length === 0;
    },
    phone() {
      return this.$store.state.Cart.phone;
    },
    street() {
      return this.newAddress.street;
    },
    building() {
      return this.newAddress.building;
    },
    flat() {
      return this.newAddress.flat;
    },
  },
  methods: {
    async submitOrder() {
      let payload = {
        userId: this.isAuthenticated ? this.user.id : null,
        phone: this.phone,
        address: this.getDeliveryAddress(),
        pizzas: this.pizzas.map((p) => this.getPizzaPayload(p)),
        misc: this.additionalItems
          .filter((i) => i.count > 0)
          .map((i) => ({ miscId: i.id, quantity: i.count })),
      };
      await this.$store.dispatch("Orders/submitOrder", payload);
      this.showPopup = true;
    },
    resetState() {
      this.showPopup = false;
      this.$store.dispatch("Cart/resetState");
      this.$store.commit("Builder/resetState");
      this.$router.push("/");
    },
    getPizzaPayload(pizza) {
      return {
        name: pizza.name,
        sauceId: pizza.sauce.id,
        doughId: pizza.dough.id,
        sizeId: pizza.size.id,
        quantity: pizza.count,
        ingredients: pizza.ingredients.map((i) => ({
          ingredientId: i.id,
          quantity: i.count,
        })),
      };
    },
    getDeliveryAddress() {
      let address = null;
      if (this.deliveryMethod === "self-delivery") {
        address = null;
      } else if (this.deliveryMethod === "new-address") {
        address = this.newAddress;
      } else {
        address = { id: this.deliveryMethod };
      }
      if (address) {
        address.flat = address.flat ? address.flat : "-";
      }
      return address;
    },
  },
};
</script>

<style scoped></style>
