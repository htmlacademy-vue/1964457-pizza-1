<template>
  <div class="layout__content">
    <ProfileUserInfo />
    <div v-for="a in addresses" :key="a.id">
      <ProfileAddress
        :building="a.building"
        :comment="a.comment"
        :flat="a.flat"
        :id="a.id"
        :name="a.name"
        :street="a.street"
      />
    </div>
    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileUserInfo from "@/modules/profile/components/ProfileUserInfo";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
export default {
  name: "Profile",
  components: {
    ProfileUserInfo,
    ProfileAddress,
  },
  computed: {
    ...mapState("Profile", ["addresses"]),
  },
};
</script>

<style scoped></style>
