<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ cartPrice }} ₽</router-link>
    </div>
    <div v-if="isAuthenticated" key="user_authenticated" class="header__user">
      <router-link to="/profile">
        <picture>
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        </picture>
        <span name="user_name">{{ user.name }}</span>
      </router-link>
      <a href="#" @click="logout" class="header__logout"><span>Выйти</span></a>
    </div>
    <div v-else key="user_not_authenticated" class="header__user">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", ["cartPrice"]),
    ...mapState("Auth", ["isAuthenticated", "user"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("Auth/logout");
      this.$store.commit("Cart/setPhone", "");
      await this.$router.push("/");
    },
  },
};
</script>
