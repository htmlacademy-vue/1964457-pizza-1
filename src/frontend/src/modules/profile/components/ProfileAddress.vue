<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ name }}</b>
        <div class="address-form__edit">
          <button @click="$emit(`edit`)" type="button" class="icon">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ fullAddress }}</p>
      <small>{{ comment }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAddress",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    flat: {
      type: String,
      required: true,
    },
  },
  computed: {
    fullAddress() {
      const address = [this.street, this.building, this.flat]
        .filter((i) => i.length > 0)
        .join(", ");

      return address;
    },
  },
};
</script>
