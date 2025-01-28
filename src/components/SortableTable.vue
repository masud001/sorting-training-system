<script setup lang="ts">
import arrowIcon from '@/assets/icons/arrow.svg'
import CustomCheckbox from '@/lib/CustomCheckbox.vue'
import TagComponent from '@/lib/TagComponent.vue'
import { ref } from 'vue'
import { useStore } from '@/stores/store'
const store = useStore()
console.log('people data', store.peopleData)
const rows = ref([
  {
    email: 'juozas@bybosas.lt',
    count: 10,
    tags: ['Customers', 'Premium', 'New'],
    name: 'Juozas Bybosas',
    country: 'Lithuania',
    date: '2019-12-04 09:10:29',
    isChecked: false,
  },
  {
    email: 'example@example.com',
    count: 5,
    tags: ['Customers', 'Oldtimer', 'Premium', 'New'],
    name: 'John Doe',
    country: 'USA',
    date: '2020-01-01 12:00:00',
    isChecked: false,
  },
  {
    email: 'example@example.com',
    count: 5,
    tags: ['Customers', 'VIP'],
    name: 'John Doe',
    country: 'USA',
    date: '2020-01-01 12:00:00',
    isChecked: false,
  },
  {
    email: 'example@example.com',
    count: 5,
    tags: ['Customers', 'New', 'premium'],
    name: 'John Doe',
    country: 'USA',
    date: '2020-01-01 12:00:00',
    isChecked: false,
  },
])
</script>

<template>
  <h1 class="text-gray-100 text-default !font-bold px-xxl py-xl text-right">
    20 people in the list
  </h1>
  <div class="w-full">
    <table class="table-auto w-full">
      <thead>
        <tr class="text-left">
          <th class="border border-l-0 border-gray-600 text-default text-gray-300 py-default px-l">
            Email
          </th>
          <th class="border-t border-b border-gray-600 text-default text-gray-300 py-default px-l">
            Potatoes
          </th>
          <th class="border-t border-b border-gray-600 text-default text-gray-300 py-default px-l">
            Tags
          </th>
          <th class="border-t border-b border-gray-600 text-default text-gray-300 py-default px-l">
            Full name
          </th>
          <th class="border-t border-b border-gray-600 text-default text-gray-300 py-default px-l">
            Location
          </th>
          <th class="border-t border-b border-gray-600 text-default text-gray-300 py-default px-l">
            Date / time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="text-left hover:bg-default-hover transition-colors delay-100"
        >
          <td
            class="border-b border-r border-gray-600 text-gray-100 text-default px-l !py-[14px] flex justify-between items-center"
          >
            <span>
              <CustomCheckbox
                :id="'checkbox-' + index"
                :label="row.email"
                v-model="row.isChecked"
              />
            </span>
            <span><img :src="arrowIcon" alt="arrow-icon" /></span>
          </td>
          <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[13.5px]">
            {{ row.count }}
          </td>
          <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[9.5px]">
            <TagComponent :tags="row.tags" />
          </td>
          <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[13.5px]">
            {{ row.name }}
          </td>
          <td class="border-b border-gray-600 text-gray-100 text-default px-l py-[13.5px]">
            {{ row.country }}
          </td>
          <td class="border-b border-gray-600 border-r text-gray-100 text-default px-l py-[13.5px]">
            {{ row.date }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
