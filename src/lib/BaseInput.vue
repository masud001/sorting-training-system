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
import { ref, computed, watch, defineExpose } from 'vue'

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

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(String(props.modelValue))
const errorMessage = ref('')
const successMessage = ref('')

defineExpose({
  errorMessage,
  successMessage,
})

/**
 * Validates the current input value based on the specified type and range.
 *
 * - For 'number' type inputs:
 *   - Checks if the input is a valid number. If not, sets an error message and emits NaN.
 *   - Verifies if the number is within the defined min and max range. If not, sets an error message.
 *   - If valid, clears the error message and sets a success message.
 *   - Emits the numeric value in all cases.
 *
 * - For other input types:
 *   - Emits the raw input value without validation.
 *   - Clears any existing error or success messages.
 */
const validateInput = () => {
  const value = inputValue.value

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

const inputClasses = computed(() => {
  let borderColor = 'border-gray-600'
  let focusRingColor = 'focus:ring-primary'

  if (errorMessage.value) {
    borderColor = 'border-error'
    focusRingColor = 'focus:ring-error-active'
  } else if (successMessage.value) {
    borderColor = 'border-success'
    focusRingColor = 'focus:ring-success'
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

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = String(newValue)
    validateInput()
  },
)
</script>
