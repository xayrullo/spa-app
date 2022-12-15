<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "./store/auth";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const authStore = useAuthStore();

onBeforeMount(async () => {
  authStore.getCurrentUser();
});
</script>
<style>
</style>
