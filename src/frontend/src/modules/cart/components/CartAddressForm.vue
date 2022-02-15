<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select v-model="deliveryMethod" name="test" class="select">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="phone"
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
        />
      </label>
      <div v-if="deliveryMethod === '2'" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input v-model="street" type="text" name="street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input v-model="building" type="text" name="house" required />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input v-model="flat" type="text" name="apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartAddressForm",
  data() {
    return { deliveryMethod: "1" };
  },
  components: {},
  computed: {
    phone: {
      get() {
        return this.$store.state.Cart.phone;
      },
      set(value) {
        this.$store.commit("Cart/setPhone", value);
      },
    },
    street: {
      get() {
        return this.$store.state.Cart.newAddress.street;
      },
      set(value) {
        this.$store.commit("Cart/newAddressSetStreet", value);
      },
    },
    building: {
      get() {
        return this.$store.state.Cart.newAddress.building;
      },
      set(value) {
        this.$store.commit("Cart/newAddressSetBuilding", value);
      },
    },
    flat: {
      get() {
        return this.$store.state.Cart.newAddress.flat;
      },
      set(value) {
        this.$store.commit("Cart/newAddressSetFlat", value);
      },
    },
  },
  methods: {},
};
</script>
