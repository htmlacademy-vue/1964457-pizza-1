<template>
  <body>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>
              <div class="sheet__content dough">
                <label
                  v-for="dough in pizza.dough"
                  :key="dough.id"
                  class="dough__input"
                  :class="getClassNameForDough(dough.name)"
                >
                  <input
                    type="radio"
                    name="dough"
                    :value="getInputValueForDough(dough.name)"
                    class="visually-hidden"
                    checked
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="size in pizza.sizes"
                  :key="size.id"
                  class="diameter__input"
                  :class="getClassNameForDiameter(size.name)"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="getInputValueForDiameter(size.name)"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingredients__input"
                    v-for="sauce in pizza.sauces"
                    :key="sauce.id"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="getInputValueForSauce(sauce.name)"
                      checked
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      v-for="ingredient in pizza.ingredients"
                      :key="ingredient.id"
                      class="ingredients__item"
                    >
                      <span
                        class="filling"
                        :class="getClassNameForIngredient(ingredient)"
                        >{{ ingredient.name }}</span
                      >

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </body>
</template>

<script>
import pizza from "@/static/pizza.json";

export default {
  name: "Index",
  data() {
    return {
      pizza,
    };
  },
  methods: {
    getClassNameForDough(doughName) {
      switch (doughName) {
        case "Толстое":
          return "dough__input--large";
        case "Тонкое":
          return "dough__input--light";
        default:
          return "";
      }
    },
    getInputValueForDough(doughName) {
      switch (doughName) {
        case "Толстое":
          return "large";
        case "Тонкое":
          return "light";
        default:
          return "";
      }
    },
    getClassNameForDiameter(diameter) {
      switch (diameter) {
        case "23 см":
          return "diameter__input--small";
        case "32 см":
          return "diameter__input--normal";
        case "45 см":
          return "diameter__input--big";
        default:
          return "";
      }
    },
    getInputValueForDiameter(diameter) {
      switch (diameter) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        case "45 см":
          return "big";
        default:
          return "";
      }
    },
    getInputValueForSauce(sauceName) {
      switch (sauceName) {
        case "Томатный":
          return "tomato";
        case "Сливочный":
          return "creamy";
        default:
          return "";
      }
    },
    getClassNameForIngredient(ingridient) {
      const englishName = ingridient.image
        .replace(".svg", "")
        .split("/")
        .at(-1);
      return `filling--${englishName}`;
    },
  },
};
</script>

<style scoped></style>
