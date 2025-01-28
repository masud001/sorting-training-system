<template>
  <div class="flex gap-2 items-center flex-wrap">
    <!-- Render the first two tags -->
    <span
      v-for="(tag, index) in visibleTags"
      :key="index"
      class="text-x text-gray-300 bg-gray-700 px-[10px] py-[5px] rounded-full"
    >
      {{ tag }}
    </span>

    <!-- Render (+number) for remaining tags -->
    <span
      v-if="remainingTagsCount > 0"
      class="text-xx text-gray-300"
      :title="remainingTags.join(', ')"
    >
      (+{{ remainingTagsCount }})
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// Define props with TypeScript support
const props = defineProps({
  tags: {
    type: Array as () => string[], // Specify the type as an array of strings
    required: true,
  },
})

// Compute visible tags (first two tags)
const visibleTags = computed(() => props.tags.slice(0, 2))

// Compute the count of remaining tags
const remainingTagsCount = computed(() => props.tags.length - 2)

// Compute the remaining tags (all tags beyond the first two)
const remainingTags = computed(() => props.tags.slice(2))
</script>

<style scoped></style>
