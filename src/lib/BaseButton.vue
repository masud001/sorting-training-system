<template>
  <!-- Button rendering -->
  <button
    v-if="!href"
    :type="type"
    :class="buttonClasses"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>

  <!-- Link rendering -->
  <a v-else :href="href" :target="target" :rel="rel" :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { computed, defineProps, type PropType } from 'vue'

// Props declaration
const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String as PropType<'_self' | '_blank' | '_parent' | '_top'>,
    default: '_blank',
  },
  rel: {
    type: String,
    default: 'noopener noreferrer',
  },
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'error' | 'default' | 'link'>,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: null,
  },
})

// Handle click event
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault() // Prevent actions if disabled
    return
  }
  if (props.onClick) {
    props.onClick(event) // Execute provided onClick function
  }
}

// Dynamically compute button classes based on variant and state
const buttonClasses = computed(() => {
  const baseClasses =
    'px-[15px] py-[10px] lg:px-[36px] lg:py-[15px] text-small sm:text-base rounded-[5px] shadow-xs !font-bold focus:outline-none transition-all delay-100 capitalize cursor-pointer'

  const variantClasses = {
    primary: 'bg-primary text-gray-900 hover:bg-primary-hover active:bg-primary-active',
    secondary: 'bg-secondary text-gray-900 hover:bg-secondary-hover active:bg-secondary-active',
    error: 'bg-error text-gray-900 hover:bg-error-hover active:bg-error-active',
    default: 'bg-default-color text-gray-300 hover:bg-default-hover active:bg-default-active',
    link: 'text-gray-100 hover:text-gray-300 focus:ring-gray-300 hover:underline',
  }

  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  const classes = `${baseClasses} ${variantClasses[props.variant]} ${disabledClasses}`
  return classes
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
