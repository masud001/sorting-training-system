<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div
    aria-label="main-container"
    class="main-container w-full sm:w-lg md:w-2xl lg:w-4xl xl:w-6xl 2xl:w-7xl px-default py-xxl"
  >
    <div class="w-full">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  margin: 0 auto;
}
</style>
