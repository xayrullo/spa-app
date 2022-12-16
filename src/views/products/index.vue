<template>
  <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <Categories :data="categories" @changed="filterByCategory" />
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
</template>
  <script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import ProductCard from "../../components/ProductCard.vue";
import Pagination from "../../components/Pagination.vue";
import Categories from "../../components/Categories.vue";

import { useCategoryStore } from "../../store/category";

const router = useRouter();
const route = useRoute();

const categoryStore = useCategoryStore();
const categories = ref([]);

onBeforeMount(async () => {
  categoryStore.loadCategories().then((res) => {
    categories.value = [...res];
  });
});

function filterByCategory(val) {
  router.push({
    path: route.path,
    query: {
      category: val,
    },
  });
}
</script>