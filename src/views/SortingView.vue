<script setup lang="ts">
import AppDialog from '@/components/AppDialog.vue'
import SortableTable from '@/components/SortableTable.vue'
import BaseButton from '@/lib/BaseButton.vue'
import BaseInput from '@/lib/BaseInput.vue'
import { ref, watch } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

const open = defineModel({ type: Boolean, default: false })
const numberValue = ref(0)
const isInvalid = ref(true)

const handleButtonClick = () => {
  open.value = !open.value
  numberValue.value = 0
}

const handleButtonStart = () => {
  const value = numberValue.value
  open.value = false
  console.log('input value', value)
  store.generatePeopleData(value)
  const data = store.generatePeopleData(value)
  console.log('data: ', data)
}
// Validate input value
const validateInput = (value: number) => {
  if (value >= 20 && value <= 100) {
    isInvalid.value = false // Enable the Start button
  } else {
    isInvalid.value = true // Disable the Start button
  }
}

// Watch for changes in numberValue
watch(numberValue, (newValue) => {
  validateInput(newValue)
})
</script>

<template>
  <header class="w-full flex justify-between items-center">
    <h1 class="text-heading-1 !font-bold">Sorting Training System</h1>
    <BaseButton :onClick="handleButtonClick" variant="primary">Start sorting! </BaseButton>
  </header>
  <main class="!mt-xxl bg-gray-900 rounded-[5px] shadow border border-gray-600 pb-[50px]">
    <SortableTable />
  </main>

  <!-- app dialog  -->

  <AppDialog v-model="open" title="How many people?">
    <div class="p-default !mb-xxl">
      <BaseInput
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
</template>
