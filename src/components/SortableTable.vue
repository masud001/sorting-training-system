<script setup lang="ts">
import arrowIcon from '@/assets/icons/arrow.svg'
import CustomCheckbox from '@/lib/CustomCheckbox.vue'
import TagComponent from '@/lib/TagComponent.vue'
import { ref, defineExpose } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import type { PersonData } from '@/stores/types'
const store = useStore()
const drag = ref(false)

defineExpose({
  drag,
})
const handleRowClick = (rowData: PersonData, isChecked: boolean) => {
  console.log('Row Data:', rowData)
  console.log('Checkbox Checked:', isChecked)
  // You can now use the rowData and isChecked values as needed
}
</script>

<template>
  <div aria-label="table-heading" class="p-default xl:p-l flex items-center justify-end">
    <p class="text-gray-100 text-default !font-bold">
      {{
        store.peoples.length === 0
          ? '0 people in the list'
          : `${store.peoples.length} people in the list`
      }}
    </p>
  </div>
  <div class="table-class w-full overflow-x-scroll xl:overflow-x-hidden">
    <table class="table-auto !w-full min-w-6xl xl:min-w-full" :disabled="store.success">
      <thead>
        <tr class="text-left">
          <th
            class="border border-l-0 border-gray-600 text-default text-gray-300 p-default xl:px-l"
          >
            Email
          </th>
          <th
            class="border-t border-b border-gray-600 text-default text-gray-300 p-default xl:px-l"
          >
            Potatoes
          </th>
          <th
            class="border-t border-b border-gray-600 text-default text-gray-300 p-default xl:px-l"
          >
            Tags
          </th>
          <th
            class="border-t border-b border-gray-600 text-default text-gray-300 p-default xl:px-l"
          >
            Full name
          </th>
          <th
            class="border-t border-b border-gray-600 text-default text-gray-300 p-default xl:px-l"
          >
            Location
          </th>
          <th
            class="border-t border-b border-gray-600 text-default text-gray-300 p-default xl:px-l"
          >
            Date / time
          </th>
        </tr>
      </thead>

      <template v-if="store.peoples.length === 0">
        <tbody class="bg-error-bg">
          <tr>
            <td class="py-12 text-center" colspan="6">
              <div class="text-2xl text-error-active !font-bold">No data available</div>
              <div class="text-sm text-error">
                Please add people data by clicking on the
                <strong class="text-error-active !font-bold">"Start Sorting"</strong> button above.
                :)
              </div>
            </td>
          </tr>
        </tbody>
      </template>

      <template v-else>
        <draggable
          v-model="store.peoples"
          :disabled="store.success"
          group="people"
          item-key="count"
          tag="tbody"
          @start="drag = true"
          @end="drag = false"
          :touchStartThreshold="10"
          :delay="200"
          :delayOnTouchOnly="true"
        >
          <template #item="{ element, index }">
            <tr class="text-left hover:bg-default-hover transition-colors delay-100">
              <td
                class="border-b border-r border-gray-600 text-gray-100 text-default px-l !py-[14px] flex justify-between items-center"
              >
                <span>
                  <CustomCheckbox
                    :id="'checkbox-' + index"
                    :label="element.email"
                    v-model="element.isChecked"
                    :row-data="element"
                    @row-click="handleRowClick"
                  />
                </span>
                <span><img :src="arrowIcon" alt="arrow-icon" /></span>
              </td>
              <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[13.5px]">
                {{ element.potatoes }}
              </td>
              <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[9.5px]">
                <TagComponent :tags="element.tags" />
              </td>
              <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[13.5px]">
                {{ element.name }}
              </td>
              <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[13.5px]">
                {{ element.country }}
              </td>
              <td
                class="border-b border-gray-600 border-r text-gray-100 text-default px-l py-[13.5px]"
              >
                {{ element.date }}
              </td>
            </tr>
          </template>
        </draggable>
      </template>
    </table>
  </div>
</template>
