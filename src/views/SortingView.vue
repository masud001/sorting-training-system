<script setup lang="ts">
import AppDialog from '@/components/AppDialog.vue'
import SortableTable from '@/components/SortableTable.vue'
import BaseButton from '@/lib/BaseButton.vue'
import BaseInput from '@/lib/BaseInput.vue'
import { ref, watch, defineExpose, type Ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

const open: Ref<boolean> = defineModel({ type: Boolean, default: false })
defineExpose({ open })
const numberValue = ref(0)
const isInvalid = ref(true)

/**
 * Handles the click event of the BaseButton component (Start sorting! button).
 * When the button is clicked, this function toggles the open property of the
 * AppDialog component and resets the numberValue property to 0.
 */
const handleButtonClick = () => {
  open.value = !open.value
  numberValue.value = 0
}

/**
 * Handles the Start button click event when the user enters a valid number of people
 * and clicks the Start button. This function gets the current value of the input field,
 * closes the AppDialog (adds people modal), and calls the generatePeoples method of
 * the store to generate the people data and start the timer.
 */
const handleButtonStart = () => {
  const value = numberValue.value
  open.value = false
  store.generatePeoples(value)
}

/**
 * Validates the input value to ensure it's within the acceptable range.
 * If the value is between 20 and 100 (inclusive), it enables the Start button
 * by setting isInvalid to false. Otherwise, it disables the Start button by
 * setting isInvalid to true.
 *
 * @param value - The number to validate.
 */
const validateInput = (value: number) => {
  if (value >= 20 && value <= 100) {
    isInvalid.value = false
  } else {
    isInvalid.value = true
  }
}

watch(numberValue, (newValue) => {
  validateInput(newValue)
})

watch(
  () => store.showSuccessModal,
  (newValue) => {
    if (newValue) {
      open.value = false
    }
  },
)
</script>

<template>
  <header aria-label="header" class="w-full flex justify-between items-center">
    <h1 class="text-base sm:text-heading-2 lg:text-heading-1 !font-bold">
      Sorting Training System
    </h1>
    <BaseButton :onClick="handleButtonClick" variant="primary">Start sorting! </BaseButton>
  </header>
  <main
    aria-label="main"
    class="!mt-xxl bg-gray-900 rounded-[5px] shadow border border-gray-600 pb-[50px]"
  >
    <SortableTable />
  </main>

  <!-- app dialog (add people)  -->
  <AppDialog v-model="open" title="How many people?">
    <div class="p-default !mb-xxl">
      <BaseInput
        ref="myBaseInput"
        v-model="numberValue"
        v-model:is-invalid="isInvalid"
        label="Enter a number of how many people you want to add to the list."
        type="number"
        placeholder="Enter a number"
        :min="20"
        :max="100"
      />
    </div>

    <div class="flex items-center gap-2.5 justify-end flex-row p-default border-t border-gray-600">
      <BaseButton :onClick="handleButtonClick" variant="default">cancel</BaseButton>
      <BaseButton :onClick="handleButtonStart" variant="primary" :disabled="isInvalid"
        >Start
      </BaseButton>
    </div>
  </AppDialog>
  <!-- success modal (after people sort) -->
  <AppDialog v-model="store.showSuccessModal" title="Congratulations! 🎉">
    <div class="p-xxl text-center bg-success-bg border border-success">
      <template v-if="store.startTime">
        <p class="text-success text-base !mb-3.5">
          You’ve successfully sorted the people of Potatostan!
        </p>
        <p class="text-success !font-bold text-heading-3">Your Score</p>
        <p class="text-success !font-bold text-heading-3">Time Taken: {{ store.timeConsumed }}</p>
      </template>
    </div>
    <div class="flex items-center gap-2.5 justify-end flex-row p-default border-t border-gray-600">
      <BaseButton :onClick="() => store.setShowSuccessModal(false)" variant="primary"
        >Close
      </BaseButton>
    </div>
  </AppDialog>
</template>
