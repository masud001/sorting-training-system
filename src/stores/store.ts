import { faker } from '@faker-js/faker'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { PersonData } from './types'

export const useStore = defineStore('store', () => {
  const peopleData = ref<Array<PersonData>>([])
  const generatePeopleData = (num: number = 100) => {
    peopleData.value = []
    const tagsPool = ['Customers', 'Premium', 'New', 'Oldtimer', 'VIP', 'Regular']

    for (let i = 0; i < num; i++) {
      const tagsCount = Math.floor(Math.random() * 4) + 1
      const tags = Array.from(
        { length: tagsCount },
        () => tagsPool[Math.floor(Math.random() * tagsPool.length)],
      )

      peopleData.value.push({
        email: faker.internet.email(),
        count: Math.floor(Math.random() * 50) + 1,
        tags: [...new Set(tags)], // Ensures unique tags in the array
        name: faker.person.fullName(),
        country: faker.location.country(),
        date: faker.date.recent({ days: 3650 }).toISOString().replace('T', ' ').slice(0, 19),
        isChecked: false,
      })
    }
  }

  // Watch for changes in peopleData
  watch(
    () => peopleData, // Watch the peopleData array
    (newPeopleData) => {
      console.log('peopleData has been updated:', newPeopleData)
      // Perform any action you need when peopleData changes
      // For example, you can update a local state or trigger a side effect
    },
    { deep: true }, // Enable deep watching
  )

  return { generatePeopleData, peopleData }
})
