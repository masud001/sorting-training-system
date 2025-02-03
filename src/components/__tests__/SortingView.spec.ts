import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import BaseButton from '@/lib/BaseButton.vue'
import AppDialog from '@/components/AppDialog.vue'
import SortableTable from '@/components/SortableTable.vue'
import { ref, defineExpose } from 'vue'
import SortingView from '@/views/SortingView.vue'
import { describe, expect, it } from 'vitest'

const isInvalid = ref(false)
defineExpose({
  isInvalid,
})
describe('SortingView', () => {
  let wrapper: ReturnType<typeof mount<typeof SortingView>> | null = null

  const pinia = createPinia()
  setActivePinia(pinia)

  wrapper = mount(SortingView, {
    global: {
      plugins: [pinia],
    },
  })

  it('Test Case 1: renders correctly', () => {
    expect(wrapper!.find('h1').text()).toBe('Sorting Training System')
    expect(wrapper!.findComponent({ name: 'BaseButton' }).text()).toBe('Start sorting!')
  })

  it('Test Case 2: opens and closes the dialog', async () => {
    const startButton = wrapper?.findComponent({ name: 'BaseButton' })
    if (startButton) {
      await startButton.trigger('click')
      expect(wrapper?.findComponent({ name: 'AppDialog' }).exists()).toBe(true)
    } else {
      expect(() => {
        throw new Error('startButton is null or undefined. Unable to trigger click event.')
      }).toThrow()
    }

    const cancelButton = wrapper?.findAllComponents({ name: 'BaseButton' })[1]
    if (cancelButton) {
      await cancelButton.trigger('click')
      expect(wrapper?.findComponent({ name: 'AppDialog' }).exists()).toBe(false)
    } else {
      expect(() => {
        throw new Error('cancelButton is null or undefined. Unable to trigger click event.')
      }).toThrow()
    }
  })

  it('Test Case 3: should render the component properly', () => {
    const wrapper = mount(SortingView)
    expect(wrapper.find('h1').text()).toBe('Sorting Training System')
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true)
    expect(wrapper.findComponent(SortableTable).exists()).toBe(true)
    expect(wrapper.findComponent(AppDialog).exists()).toBe(true)
  })
})
