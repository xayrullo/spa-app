<template>
  <div class="buttoncomp">
    <button :disabled="!props.isValid">{{ text }}</button>
  </div>
</template>
<script setup>
const props = defineProps(["text", "isValid", "height", "width"]);
</script>

<style scoped>
button {
  @apply cursor-pointer w-[v-bind(props.width)] h-[v-bind(props.height)] py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200;
}
button:disabled {
  @apply cursor-not-allowed bg-gray-400;
}
</style>