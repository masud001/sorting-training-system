<template>
  <div class="flex flex-col space-y-2">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="text-small font-normal text-gray-300 !mb-default">
      {{ label }}
    </label>

    <!-- Input -->
    <input
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :class="inputClasses"
      @input="validateInput"
      :placeholder="placeholder"
    />

    <!-- Error Message -->
    <div v-if="errorMessage" class="text-error text-small !mt-m">
      {{ errorMessage }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="text-success text-small !mt-m">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number], // Allow both string and number
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  inputId: {
    type: String,
    default: 'input-range',
  },
  type: {
    type: String,
    default: 'text', // Default input type
    validator: (value: string) =>
      ['text', 'number', 'email', 'password', 'tel', 'url'].includes(value), // Validate input type
  },
  placeholder: {
    type: String,
    default: 'Enter a value',
  },
  min: {
    type: Number,
    default: 20, // Minimum value for validation
  },
  max: {
    type: Number,
    default: 100, // Maximum value for validation
  },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Reactive state
const inputValue = ref(String(props.modelValue)) // Convert initial value to string
const errorMessage = ref('')
const successMessage = ref('')

// Validation function
const validateInput = () => {
  const value = inputValue.value

  // Handle number validation if type is 'number'
  if (props.type === 'number') {
    const numericValue = parseFloat(value)

    if (isNaN(numericValue)) {
      errorMessage.value = 'Please enter a valid number.'
      successMessage.value = ''
      emit('update:modelValue', NaN)
    } else if (numericValue < props.min || numericValue > props.max) {
      errorMessage.value = `Value must be between ${props.min} and ${props.max}.`
      successMessage.value = ''
      emit('update:modelValue', numericValue)
    } else {
      errorMessage.value = ''
      successMessage.value = 'Value is within the valid range.'
      emit('update:modelValue', numericValue)
    }
  } else {
    // For non-number types, emit the raw value
    emit('update:modelValue', value)
    errorMessage.value = ''
    successMessage.value = ''
  }
}

// Dynamic input classes
const inputClasses = computed(() => {
  let borderColor = 'border-gray-600' // Default border color
  let focusRingColor = 'focus:ring-primary' // Default focus ring color

  if (errorMessage.value) {
    borderColor = 'border-error' // Error border color
    focusRingColor = 'focus:ring-error-active' // Error focus ring color
  } else if (successMessage.value) {
    borderColor = 'border-success' // Success border color
    focusRingColor = 'focus:ring-success' // Success focus ring color
  }
  return [
    'px-4',
    'py-2',
    'border',
    'rounded',
    'focus:outline-none',
    'focus:ring',
    borderColor,
    focusRingColor,
  ]
})

// Watch for changes in modelValue prop
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = String(newValue) // Convert new value to string
    validateInput()
  },
)
</script>
