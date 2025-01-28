<template>
  <div class="flex items-center space-x-2">
    <!-- Custom Checkbox -->
    <div
      class="relative flex items-center justify-center w-5 h-5 border rounded-sm cursor-pointer"
      :class="{ 'bg-primary border-primary': modelValue, 'border-gray-400': !modelValue }"
      @click="toggle"
    >
      <!-- Check Icon -->
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>

    <!-- Label -->
    <label
      class="text-gray-100 !ml-l cursor-pointer select-none"
      @click="toggle"
      :for="'checkbox-' + Math.random().toString(36)"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
