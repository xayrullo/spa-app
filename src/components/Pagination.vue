<template>
  <nav
    v-if="productStore.pagination.pageCount <= 5"
    class="
      flex
      items-center
      justify-between
      border-t border-gray-200
      px-4
      sm:px-0
    "
  >
    <div class="-mt-px flex w-0 flex-1">
      <a
        class="
          inline-flex
          items-center
          border-t-2 border-transparent
          pt-4
          pr-1
          text-sm
          font-medium
          text-gray-500
          hover:border-gray-300 hover:text-gray-700
        "
        @click="previousPage"
      >
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a
        v-for="(page, ind) in productStore.pagination.pageCount"
        :key="ind"
        class="
          inline-flex
          items-center
          border-t-2
          px-4
          pt-4
          text-sm
          font-medium
          cursor-pointer
        "
        @click="emits('onChange', page)"
        :class="
          page.toString() === route.query.page ||
          (page === 1 && !route.query.page)
            ? 'border-blue-500 text-blue-600'
            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent'
        "
        >{{ page }}</a
      >
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        class="
          inline-flex
          items-center
          border-t-2 border-transparent
          pt-4
          pl-1
          text-sm
          font-medium
          text-gray-500
          hover:border-gray-300 hover:text-gray-700
        "
        @click="nextPage"
      >
        <svg
          class="ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </nav>
  <nav
    v-else
    class="
      flex
      items-center
      justify-between
      border-t border-gray-200
      px-4
      sm:px-0
    "
  >
    <div class="-mt-px flex w-0 flex-1">
      <a
        class="
          inline-flex
          items-center
          border-t-2 border-transparent
          pt-4
          pr-1
          text-sm
          font-medium
          text-gray-500
          hover:border-gray-300 hover:text-gray-700
        "
        @click="previousPage"
      >
        <!-- Heroicon name: mini/arrow-long-left -->
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a
        v-if="beginningPages.first > 1"
        class="
          inline-flex
          items-center
          border-t-2
          px-4
          pt-4
          text-sm
          font-medium
          cursor-pointer
        "
        :class="
          '1' === route.query.page || !route.query.page
            ? 'border-blue-500 text-blue-600'
            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent'
        "
        @click="emits('onChange', 1)"
        >1</a
      >
      <span
        v-if="beginningPages.first > 2"
        class="
          inline-flex
          items-center
          border-t-2 border-transparent
          px-4
          pt-4
          text-sm
          font-medium
          text-gray-500
        "
        >...</span
      >
      <a
        class="
          inline-flex
          items-center
          border-t-2
          px-4
          pt-4
          text-sm
          font-medium
          cursor-pointer
        "
        :class="
          beginningPages.first.toString() === route.query.page
            ? 'border-blue-500 text-blue-600'
            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent'
        "
        @click="changePage(beginningPages.first)"
        >{{ beginningPages.first }}</a
      >
      <a
        class="
          inline-flex
          items-center
          border-t-2
          px-4
          pt-4
          text-sm
          font-medium
          cursor-pointer
        "
        :class="
          beginningPages.second.toString() === route.query.page
            ? 'border-blue-500 text-blue-600'
            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent'
        "
        @click="changePage(beginningPages.second)"
        >{{ beginningPages.second }}</a
      >
      <a
        class="
          inline-flex
          items-center
          border-t-2
          px-4
          pt-4
          text-sm
          font-medium
          cursor-pointer
        "
        :class="
          beginningPages.third.toString() === route.query.page
            ? 'border-blue-500 text-blue-600'
            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent'
        "
        @click="changePage(beginningPages.third)"
        >{{ beginningPages.third }}</a
      >
      <span
        v-if="beginningPages.third < productStore.pagination.pageCount"
        class="
          inline-flex
          items-center
          border-t-2 border-transparent
          px-4
          pt-4
          text-sm
          font-medium
          text-gray-500
        "
        >...</span
      >
      <a
        v-if="beginningPages.third < productStore.pagination.pageCount"
        class="
          inline-flex
          items-center
          border-t-2
          px-4
          pt-4
          text-sm
          font-medium
          cursor-pointer
        "
        :class="
          productStore.pagination.pageCount.toString() === route.query.page
            ? 'border-blue-500 text-blue-600'
            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent'
        "
        @click="changePage(productStore.pagination.pageCount)"
        >{{ productStore.pagination.pageCount }}</a
      >
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        href="#"
        class="
          inline-flex
          items-center
          border-t-2 border-transparent
          pt-4
          pl-1
          text-sm
          font-medium
          text-gray-500
          hover:border-gray-300 hover:text-gray-700
        "
        @click="nextPage"
      >
        <svg
          class="ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </nav>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

import { useProductStore } from "../store/product";

const emits = defineEmits(["onChange"]);

const productStore = useProductStore();

const route = useRoute();

const beginningPages = ref({
  first: 2,
  second: 3,
  third: 4,
});

onBeforeMount(async () => {
  if (route.query.page && parseInt(route.query.page) >= 4) {
    const page = parseInt(route.query.page);
    beginningPages.value.first = page - 1;
    beginningPages.value.second = page;
    beginningPages.value.third = page + 1;
  }
});

function changePage(page) {
  if (page === productStore.pagination.pageCount) {
    beginningPages.value.first = page - 2;
    beginningPages.value.second = page - 1;
    beginningPages.value.third = page;
  } else if (page === 1) {
    beginningPages.value.first = page;
    beginningPages.value.second = page + 1;
    beginningPages.value.third = page + 2;
  } else {
    beginningPages.value.first = page - 1;
    beginningPages.value.second = page;
    beginningPages.value.third = page + 1;
  }
  emits("onChange", page);
}

function previousPage() {
  if (route.query.page - 1 >= 1) {
    changePage(route.query.page - 1);
  }
}
function nextPage() {
  if (route.query.page + 1 <= productStore.pagination.pageCount) {
    changePage(route.query.page + 1);
  }
}
</script>