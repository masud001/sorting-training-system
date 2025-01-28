<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main-container w-6xl px-default py-xxl">
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
