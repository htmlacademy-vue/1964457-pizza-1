<template>
  <div class="layout__content">
    <ProfileUserInfo />
    <div v-for="a in addresses" :key="a.id">
      <ProfileAddress
        @edit="openAddressForm(a, true)"
        :building="a.building"
        :comment="a.comment"
        :flat="a.flat"
        :id="a.id"
        :name="a.name"
        :street="a.street"
      />
    </div>
    <div class="layout__button">
      <button
        @click="openAddressForm({}, false)"
        type="button"
        class="button button--border"
      >
        Добавить новый адрес
      </button>
    </div>
    <div v-if="showAddressForm">
      <ProfileAddressForm
        @addAddress="addAddress"
        @updateAddress="updateAddress"
        @deleteAddress="deleteAddress"
        :address="addressToEdit"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileUserInfo from "@/modules/profile/components/ProfileUserInfo";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
export default {
  name: "Profile",
  components: {
    ProfileUserInfo,
    ProfileAddress,
    ProfileAddressForm,
  },
  data() {
    return {
      showAddressForm: false,
      addressToEdit: {
        id: -1,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },
  methods: {
    resetAddressToEdit() {
      this.addressToEdit = {
        id: -1,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
    openAddressForm(address, edit) {
      if (edit) {
        this.addressToEdit.id = address.id;
        this.addressToEdit.name = address.name;
        this.addressToEdit.street = address.street;
        this.addressToEdit.building = address.building;
        this.addressToEdit.flat = address.flat;
        this.addressToEdit.comment = address.comment;
      }
      this.showAddressForm = true;
    },
    async addAddress(address) {
      let payload = Object.assign({}, address);
      payload.userId = this.user.id;
      delete payload.id;
      await this.$store.dispatch("Profile/addAddress", payload);
      this.resetAddressToEdit();
      this.showAddressForm = false;
    },
    async updateAddress(address) {
      let payload = Object.assign({}, address);
      payload.userId = this.user.id;
      await this.$store.dispatch("Profile/updateAddress", payload);
      this.resetAddressToEdit();
      this.showAddressForm = false;
    },
    async deleteAddress(addressId) {
      await this.$store.dispatch("Profile/deleteAddress", addressId);
      this.resetAddressToEdit();
      this.showAddressForm = false;
    },
  },
  computed: {
    ...mapState("Profile", ["addresses"]),
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style scoped></style>
