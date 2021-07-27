<template>
  <div id="app">
    <app-loader v-if="isLoading" />
    <template v-else>
      <app-header />
      <router-view />
    </template>
  </div>
</template>

<script>
import AppLoader from "@/components/Loader";
import AppHeader from "@/components/Header";

export default {
  name: "App",
  data() {
    return {
      isLoading: true
    };
  },
  created() {
    this.$store.dispatch("getCurrentUser").then(() => {
      this.isLoading = false;
    });
  },
  components: { AppLoader, AppHeader }
};
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
