<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="popup">
          <a href="#" class="close" @click="$emit(`close`)">
            <span class="visually-hidden">Закрыть попап</span>
          </a>
          <div class="popup__title">
            <h2 class="title">Спасибо за заказ</h2>
          </div>
          <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
          <div class="popup__button">
            <a href="#" class="button" @click="$emit(`close`)"
              >Отлично, я жду!</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPopup",
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
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>
