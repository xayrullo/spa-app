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
      <ProductCard v-for="(val, ind) in products" :key="ind" :data="val" />
    </div>
    <Pagination
      v-if="productStore.pagination.pageCount > 1"
      :pagination="productStore.pagination"
      @onChange="pageChanged"
    />
  </div>
</template>
  <script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import ProductCard from "../../components/ProductCard.vue";
import Pagination from "../../components/Pagination.vue";
import Categories from "../../components/Categories.vue";

import { useCategoryStore } from "../../store/category";
import { useProductStore } from "../../store/product";

const router = useRouter();
const route = useRoute();

const categoryStore = useCategoryStore();
const productStore = useProductStore();

const categories = ref([]);
const products = ref([]);

onBeforeMount(async () => {
  await categoryStore.loadCategories().then((res) => {
    categories.value = [...res];
  });
  await fetchProducts();
});

async function filterByCategory(val) {
  await router.push({
    path: route.path,
    query: {
      category: val,
    },
  });
  await fetchProducts();
}
async function pageChanged(val) {
  console.log("Pagechanged: ", val);
  await router.push({
    path: route.path,
    query: {
      page: val,
      category: route.query.category ? route.query.category : "all",
    },
  });
  await fetchProducts();
}

async function fetchProducts() {
  const _query = { ...route.query };
  await productStore
    .loadProducts({
      category:
        _query.category && _query.category !== "all" ? _query.category : null,
      page: _query.page && _query.page !== "1" ? _query.page : 1,
    })
    .then((res) => {
      products.value = [...res];
    });
}
</script>