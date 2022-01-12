<template>
  <div>
    <form action="test.html" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
         </div> -->
          <CartPizzaList />
          <CartAdditionalItems />
          <CartAddressForm />
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <a href="#" class="button button--border button--arrow"
            >Хочу еще одну</a
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
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
import { mapGetters } from "vuex";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalItems from "@/modules/cart/components/CartAdditionalItems";
import CartAddressForm from "@/modules/cart/components/CartAddressForm";
export default {
  name: "Cart",
  components: {
    CartPizzaList,
    CartAdditionalItems,
    CartAddressForm,
  },
  computed: {
    ...mapGetters("Cart", ["cartPrice"]),
  },
};
</script>

<style scoped></style>
