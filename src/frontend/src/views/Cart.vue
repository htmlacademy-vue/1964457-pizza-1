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
          <CartListSheet />
          <!-- <ul class="cart-list sheet">
            <li v-for="pizza in pizzas" :key="pizza.id" class="cart-list__item">
              <div class="product cart-list__product">
                <img
                  src="img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="pizza.name"
                />
                <div class="product__text">
                  <h2>{{ pizza.name }}</h2>
                  <ul>
                    <li>
                      {{ pizza.size.name }}, Тесто :
                      {{ pizza.dough.name.toLowerCase() }}
                    </li>
                    <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
                    <li>Начинка: {{ getIngredientNames(pizza) }}</li>
                  </ul>
                </div>
              </div>

              <CartItemCounter
                :min="0"
                :current="pizza.count"
                @increase="increasePizzaCount(pizza.id)"
                @decrease="decreaseOrRemovePizza(pizza.id)"
              />
              <div class="cart-list__price">
                <b> x {{ pizza.price }} ₽ </b>
              </div>

              <div class="cart-list__button">
                <button
                  @click="editPizza(pizza.id)"
                  type="button"
                  class="cart-list__edit"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul> -->

          <div class="cart__additional">
            <ul class="additional-list">
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    src="img/cola.svg"
                    width="39"
                    height="60"
                    alt="Coca-Cola 0,5 литра"
                  />
                  <span>Coca-Cola 0,5 литра</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="2"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× 56 ₽</b>
                  </div>
                </div>
              </li>
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    src="img/sauce.svg"
                    width="39"
                    height="60"
                    alt="Острый соус"
                  />
                  <span>Острый соус</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="2"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× 30 ₽</b>
                  </div>
                </div>
              </li>
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    src="img/potato.svg"
                    width="39"
                    height="60"
                    alt="Картошка из печи"
                  />
                  <span>Картошка из печи</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="2"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× 56 ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99" />
              </label>

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
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
import { mapState, mapGetters } from "vuex";
import CartListSheet from "@/modules/cart/components/CartListSheet";
export default {
  name: "Cart",
  components: {
    CartListSheet,
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Cart", ["cartPrice"]),
  },
  methods: {
    getIngredientNames(pizza) {
      return pizza.ingredients.map((i) => i.name.toLowerCase()).join(",");
    },
    increasePizzaCount(pizzaId) {
      this.$store.commit("Cart/increasePizzaCount", pizzaId);
    },
    decreaseOrRemovePizza(pizzaId) {
      const pizza = this.pizzas.find((x) => x.id === pizzaId);
      if (pizza.count > 1) {
        this.$store.commit("Cart/decreasePizzaCount", pizzaId);
      } else {
        this.$store.commit("Cart/removePizza", pizzaId);
      }
    },
    editPizza(pizzaId) {
      const pizza = this.pizzas.find((x) => x.id === pizzaId);
      this.$store.commit("Builder/setState", pizza);
      this.$store.commit("Cart/removePizza", pizzaId);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
