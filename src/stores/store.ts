import { faker } from '@faker-js/faker'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { PersonData } from './types'

export const useStore = defineStore('store', () => {
  const peoples = ref<Array<PersonData>>([])
  const startTime = ref<number>(0)
  const timeConsumed = ref('00:00:00.000')
  const stopwatch = ref<ReturnType<typeof setInterval> | null>(null)
  const success = ref(false)
  const showSuccessModal = ref(false)
  const successModalShown = ref(false) // To track if the success modal has been shown

  /**
   * Generates an array of random people data
   * @param {number} num The number of people to generate
   * @returns {void}
   */
  const generatePeoples = (num: number) => {
    showSuccessModal.value = false
    successModalShown.value = false
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
        !successModalShown.value &&
        peoples.value.map((p) => p.potatoes).toString() ==
          sortedPeoples.value.map((p) => p.potatoes).toString()
      ) {
        success.value = true
        showSuccessModal.value = true
        successModalShown.value = true
        stopClock()
      }
    },
    { deep: true },
  )

  /**
   * Stops the stopwatch and resets the stopwatch variable to null.
   * @returns {void}
   */
  const stopClock = () => {
    if (stopwatch.value) {
      clearInterval(stopwatch.value)
      stopwatch.value = null
    }
  }

  /**
   * Generates a unique random number of potatoes for a person.
   * The function recursively calls itself if the generated number
   * already exists in the `peoples` array.
   * @returns {number} A unique number of potatoes.
   */
  const uniqueNoOfPotatoes = () => {
    const n = faker.number.int({ min: 1, max: 100 })
    if (peoples.value.some((p) => p.potatoes === n)) {
      return uniqueNoOfPotatoes()
    }
    return n
  }

  /**
   * Updates the timeConsumed value with the elapsed time since the start time.
   * The elapsed time is formatted as 'HH:MM:SS.mmm'.
   * This function is called periodically to update the display of elapsed time.
   */
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
  /**
   * Pads the given number with leading zeros to ensure it has at least the specified number of digits.
   *
   * @param {number} num - The number to be padded with leading zeros.
   * @param {number} digit - The total number of digits the result should have, including the original number.
   * @returns {string} The number as a string, padded with leading zeros if necessary.
   */
  function zeroPrefix(num: number, digit: number) {
    let zero = ''
    for (let i = 0; i < digit; i++) {
      zero += '0'
    }
    return (zero + num).slice(-digit)
  }

  /**
   * Updates the showSuccessModal state.
   * @param {boolean} value - The new value for showSuccessModal.
   * @returns {void}
   */
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
