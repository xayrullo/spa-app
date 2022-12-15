<template>
  <div>
    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
        class="
          my-6
          grid grid-cols-1
          gap-y-6 gap-x-6
          sm:grid-cols-2
          lg:grid-cols-4
          xl:gap-x-8
        "
      >
        <ProductCard v-for="(val, ind) in 16" :key="ind" />
      </div>
      <Pagination />
    </div>
  </div>
</template>
<script setup>
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../components/Pagination.vue";
</script>