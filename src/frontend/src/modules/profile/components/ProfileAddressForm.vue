<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layout__address">
          <form
            @submit.prevent="onSubmit"
            action=""
            method="post"
            class="address-form address-form--opened sheet"
          >
            <div class="address-form__header">
              <b>{{ address.name }}</b>
            </div>

            <div class="address-form__wrapper">
              <div class="address-form__input">
                <label class="input">
                  <span>Название адреса*</span>
                  <input
                    v-model="address.name"
                    type="text"
                    name="addr-name"
                    placeholder="Введите название адреса"
                    required
                  />
                </label>
              </div>
              <div
                class="address-form__input address-form__input--size--normal"
              >
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="address.street"
                    type="text"
                    name="addr-street"
                    placeholder="Введите название улицы"
                    required
                  />
                </label>
              </div>
              <div class="address-form__input address-form__input--size--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="address.building"
                    type="text"
                    name="addr-house"
                    placeholder="Введите номер дома"
                    required
                  />
                </label>
              </div>
              <div class="address-form__input address-form__input--size--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    v-model="address.flat"
                    type="text"
                    name="addr-apartment"
                    placeholder="Введите № квартиры"
                  />
                </label>
              </div>
              <div class="address-form__input">
                <label class="input">
                  <span>Комментарий</span>
                  <input
                    v-model="address.comment"
                    type="text"
                    name="addr-comment"
                    placeholder="Введите комментарий"
                  />
                </label>
              </div>
            </div>

            <div class="address-form__buttons">
              <button
                name="delete"
                @click="onDelete"
                type="button"
                class="button button--transparent"
              >
                Удалить
              </button>
              <button name="save" @click="onSave" type="submit" class="button">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileAddressForm",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  methods: {
    inputDataIsOk() {
      return (
        this.address.name.length > 0 &&
        this.address.street.length > 0 &&
        this.address.building.length > 0
      );
    },
    async onSave() {
      if (this.inputDataIsOk()) {
        // editing existing address
        if (this.address.id != -1) {
          this.$emit("updateAddress", this.address);
        } else {
          // adding new address
          this.$emit("addAddress", this.address);
        }
      }
    },
    onSubmit() {
      this.$emit("submit");
    },
    onDelete() {
      this.$emit("deleteAddress", this.address.id);
    },
  },
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 750px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>
