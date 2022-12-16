<template>
  <div class="card">
    <router-link :to="`/products/${data.id}`" class="card__image">
      <div class="card__image__favourite">
        <button class="card__image__favourite__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <img
        :src="data.thumbnail"
        alt="data.title"
        class="card__image__picture"
      />
    </router-link>
    <div class="card__body">
      <div class="flex flex-wrap">
        <div class="w-full flex-none text-sm flex items-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-red-500 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-gray-400 whitespace-nowrap mr-3">{{
            data.rating
          }}</span
          ><span class="mr-2 text-gray-400 truncate">{{ data.brand }}</span>
        </div>
        <router-link
          :to="`/products/${data.id}`"
          class="flex items-center w-full justify-between min-w-0"
        >
          <div
            class="
              text-sm
              mr-auto
              cursor-pointer
              text-gray-400
              hover:text-blue-500
              truncate
            "
          >
            {{ data.title }}
          </div>
        </router-link>
      </div>
      <div class="text-xl text-gray-600 font-semibold mt-1">
        ${{ data.price }}
      </div>
      <div class="flex space-x-2 text-sm font-medium justify-start">
        <button
          class="
            transition
            ease-in
            duration-300
            text-sm
            font-medium
            mb-2
            md:mb-0
            bg-blue-500
            px-5
            py-2
            hover:shadow-lg
            tracking-wider
            text-white
            rounded-full
            hover:bg-blue-600
            w-full
            text-center
          "
        >
          <span class="text-center">Add Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  data: Object,
});

const route = useRoute();

onBeforeMount(() => {});
</script>
<style lang="scss" scoped>
.card {
  @apply max-w-md w-full shadow-lg rounded-xl p-6;
  @apply flex flex-col;

  &__image {
    @apply relative h-64 w-full;

    &__favourite {
      @apply absolute flex flex-col top-0 right-0 p-3;

      &__button {
        @apply transition
            ease-in
            duration-300
            hover:text-blue-500
            shadow
            hover:shadow-md
            text-gray-500
            rounded-full
            w-8
            h-8
            text-center
            p-1;
      }
    }

    &__picture {
      @apply w-full object-fill rounded-2xl max-h-64;
    }
  }
  &__body {
    @apply flex-auto justify-evenly;
  }
}
</style>