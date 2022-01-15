<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
};
</script>
