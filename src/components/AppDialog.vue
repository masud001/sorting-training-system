<script setup lang="ts">
const value = defineModel({ type: Boolean, default: false, required: true })
const { title } = defineProps<{ title: string }>()
import crosIcon from '@/assets/icons/cros-icon.svg'
const onToggle = () => {
  value.value = !value.value
}
</script>

<template>
  <transition name="fade">
    <div v-if="value">
      <div
        @click="onToggle"
        class="fixed bg-gray-100 top-0 left-0 right-0 bottom-0 opacity-70 inset-0 z-0"
      ></div>
      <div class="absolute w-1/3 h-1/3 !mx-auto !my-auto inset-0 z-50">
        <div class="max-w-full rounded-[5px] drop-shadow-lg bg-white relative">
          <div>
            <div class="flex justify-between items-center p-default border-b border-gray-600">
              <h6 class="text-heading-3 !font-bold text-gray-100">{{ title }}</h6>
              <button
                @click="onToggle"
                class="w-5 h-5 flex items-center justify-center cursor-pointer rounded-sm"
              >
                <img :src="crosIcon" alt="cancel modal icon" />
              </button>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>
