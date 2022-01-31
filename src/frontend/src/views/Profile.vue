<template>
  <div class="layout__content">
    <ProfileUserInfo />
    <div v-for="a in addresses" :key="a.id">
      <ProfileAddress
        @edit="editAddress"
        :building="a.building"
        :comment="a.comment"
        :flat="a.flat"
        :id="a.id"
        :name="a.name"
        :street="a.street"
      />
    </div>
    <div class="layout__button">
      <button @click="addAddress" type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
    <div v-if="showAddressForm">
      <ProfileAddressForm @close="closeAddressForm" />
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
    };
  },
  methods: {
    editAddress() {
      this.showAddressForm = true;
    },
    addAddress() {
      this.showAddressForm = true;
      console.log(this.showAddressForm);
    },
    closeAddressForm() {
      this.showAddressForm = false;
    },
  },
  computed: {
    ...mapState("Profile", ["addresses"]),
  },
};
</script>

<style scoped></style>
