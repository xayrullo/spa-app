<template>
  <div class="flex flex-col h-screen justify-between">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
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
