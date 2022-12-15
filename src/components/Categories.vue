<template>
  <swiper
    :modules="modules"
    :slides-per-view="6.5"
    :space-between="20"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <button
        type="button"
        class="
          rounded-md
          border border-transparent
          bg-blue-600
          px-3
          py-2
          text-sm
          font-medium
          leading-4
          text-white
          shadow-sm
          hover:bg-blue-700
          w-full
        "
      >
        Selected text
      </button>
    </swiper-slide>
    <swiper-slide v-for="(val, ind) in 15" :key="ind">
      <button
        type="button"
        class="
          rounded-md
          border border-transparent
          bg-blue-100
          px-3
          py-2
          text-sm
          font-medium
          leading-4
          text-blue-700
          hover:bg-blue-200
          w-full
        "
      >
        Unselected text
      </button>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const modules = [Navigation, Scrollbar, A11y];

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>