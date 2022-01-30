<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
        <a class="layout__link" href="#">История заказов</a>
        <a class="layout__link layout__link--active" href="#">Мои данные</a>
      </div>
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutMainWithSidebar",
  components: {
    AppLayoutHeader,
  },
};
</script>
