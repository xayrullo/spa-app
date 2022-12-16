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
        class="button"
        :class="
          !route.query.category || route.query.category === 'all'
            ? 'active_button'
            : 'disactive_button'
        "
        @click="onSelected('all')"
      >
        All
      </button>
    </swiper-slide>
    <swiper-slide v-for="(val, ind) in data" :key="ind">
      <button
        type="button"
        class="button"
        :class="
          route.query.category && route.query.category === val
            ? 'active_button'
            : 'disactive_button'
        "
        @click="onSelected(val)"
      >
        {{ val }}
      </button>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useRoute } from "vue-router";

const props = defineProps({
  data: Array,
});
const emits = defineEmits(["changed"]);

const route = useRoute();

const modules = [Navigation, Scrollbar, A11y];

onBeforeMount(() => {});

const onSelected = (val) => {
  emits("changed", val);
};
const onSwiper = (swiper) => {};
const onSlideChange = () => {};
</script>

<style lang="scss" scoped>
.button {
  @apply rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 uppercase w-full;
}
.active_button {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
.disactive_button {
  @apply bg-blue-100 text-blue-700 hover:bg-blue-200;
}
</style>