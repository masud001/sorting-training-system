import { faker } from '@faker-js/faker'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { PersonData } from './types'

export const useStore = defineStore('store', () => {
  const peoples = ref<Array<PersonData>>([])
  const startTime = ref<number>(0)
  const timeConsumed = ref('00:00:00.000')
  const stopwatch = ref(0)
  const success = ref(false)
  const showSuccessModal = ref(false)

  const generatePeoples = (num: number) => {
    showSuccessModal.value = false
    success.value = false
    peoples.value = []
    const tagsPool = ['Customers', 'Premium', 'New', 'Oldtimer', 'VIP', 'Regular']
    for (let i = 0; i < num; i++) {
      const tagsCount = Math.floor(Math.random() * 4) + 1
      const tags = Array.from(
        { length: tagsCount },
        () => tagsPool[Math.floor(Math.random() * tagsPool.length)],
      )
      const eName = faker.person.fullName().slice(0, 10)
      peoples.value.push({
        email: faker.internet
          .email({
            provider: 'jaya.com',
            firstName: eName,
          })
          .toLowerCase(),
        potatoes: uniqueNoOfPotatoes(),
        tags: [...new Set(tags)], // Ensures unique tags in the array
        name: faker.person.fullName().slice(0, 10),
        country: faker.location.country().slice(0, 10),
        date: faker.date.recent({ days: 3650 }).toISOString().replace('T', ' ').slice(0, 19),
        isChecked: false,
      })
    }
    startTime.value = Date.now()
    stopwatch.value = setInterval(startClock, 10)
  }

  const sortedPeoples = computed(() => [...peoples.value].sort((a, b) => b.potatoes - a.potatoes))

  watch(
    peoples,
    () => {
      if (
        peoples.value.map((p) => p.potatoes).toString() ==
        sortedPeoples.value.map((p) => p.potatoes).toString()
      ) {
        success.value = true
        showSuccessModal.value = true
        stopClock()
      }
    },
    { deep: true },
  )

  const stopClock = () => {
    clearInterval(stopwatch.value)
  }

  const uniqueNoOfPotatoes = () => {
    const n = faker.number.int({ min: 1, max: 100 })
    if (peoples.value.some((p) => p.potatoes === n)) {
      return uniqueNoOfPotatoes()
    }
    return n
  }

  function startClock() {
    const currentTime = Date.now(),
      timeElapsed = new Date(currentTime - startTime.value),
      hour = timeElapsed.getUTCHours(),
      min = timeElapsed.getUTCMinutes(),
      sec = timeElapsed.getUTCSeconds(),
      ms = timeElapsed.getUTCMilliseconds()

    timeConsumed.value =
      zeroPrefix(hour, 2) +
      ':' +
      zeroPrefix(min, 2) +
      ':' +
      zeroPrefix(sec, 2) +
      '.' +
      zeroPrefix(ms, 3)
  }
  function zeroPrefix(num: number, digit: number) {
    let zero = ''
    for (let i = 0; i < digit; i++) {
      zero += '0'
    }
    return (zero + num).slice(-digit)
  }

  const setShowSuccessModal = (value: boolean) => {
    showSuccessModal.value = value
  }

  return {
    generatePeoples,
    peoples,
    timeConsumed,
    stopClock,
    startTime,
    success,
    setShowSuccessModal,
    showSuccessModal,
  }
})
