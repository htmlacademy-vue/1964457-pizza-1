<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <AppLayoutMain />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutMain from "@/layouts/AppLayoutMain";

export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
    AppLayoutMain,
  },
};
</script>
