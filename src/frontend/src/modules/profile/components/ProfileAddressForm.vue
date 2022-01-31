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
              <b>Адрес №1</b>
            </div>

            <div class="address-form__wrapper">
              <div class="address-form__input">
                <label class="input">
                  <span>Название адреса*</span>
                  <input
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
                    type="text"
                    name="addr-comment"
                    placeholder="Введите комментарий"
                  />
                </label>
              </div>
            </div>

            <div class="address-form__buttons">
              <button
                @click="onDelete"
                type="button"
                class="button button--transparent"
              >
                Удалить
              </button>
              <button @clicl="onSave" type="submit" class="button">
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
  methods: {
    onSubmit() {
      this.$emit("close");
    },
    onSave() {
      this.$emit("close");
    },
    onDelete() {
      this.$emit("close");
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
