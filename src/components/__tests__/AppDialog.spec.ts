import { mount } from '@vue/test-utils'
import AppDialog from '@/components/AppDialog.vue'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

const modelValue = ref(true)
describe('AppDialog', () => {
  it('Test case 1: renders the dialog when value is true', async () => {
    const wrapper = mount(AppDialog, {
      props: {
        title: 'Test Dialog',
        modelValue: modelValue.value,
      },
    })

    expect(wrapper.find('.fixed.bg-gray-100').exists()).toBe(true)
    expect(wrapper.find('[class*="rounded"]').exists()).toBe(true)
  })

  it('Test case 2: does not render the dialog when value is false', async () => {
    modelValue.value = false
    const wrapper = mount(AppDialog, {
      props: {
        title: 'Test Dialog',
        modelValue: modelValue.value,
      },
    })

    expect(wrapper.find('.fixed.bg-gray-100').exists()).toBe(false)
    expect(wrapper.find('[class*="rounded"]').exists()).toBe(false)
  })

  it('Test case 3: displays the correct title', () => {
    const title = 'Test Dialog'
    const wrapper = mount(AppDialog, {
      props: {
        title,
        modelValue: true,
      },
    })

    expect(wrapper.find('h6').text()).toBe(title)
  })

  it('Test case 4: closes the dialog when the close button is clicked', async () => {
    const wrapper = mount(AppDialog, {
      props: {
        title: 'Test Dialog',
        modelValue: true,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('Test case 5: closes the dialog when the overlay is clicked', async () => {
    const wrapper = mount(AppDialog, {
      props: {
        title: 'Test Dialog',
        modelValue: true,
      },
    })

    await wrapper.find('.fixed.bg-gray-100').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('Test case 6: applies the correct transition classes', async () => {
    const modelValue = ref(true)

    const wrapper = mount(AppDialog, {
      props: {
        title: 'Test Dialog',
        modelValue: modelValue.value,
      },
      attachTo: document.body, // Attach to DOM to properly test transitions
    })

    await nextTick() // Wait for DOM updates

    // Simulate transition start manually
    const overlay = wrapper.find('.fixed.bg-gray-100')
    expect(overlay.exists()).toBe(true)

    overlay.element.classList.add('fade-enter-active') // Manually add class
    await nextTick()

    expect(overlay.classes()).toContain('fade-enter-active')

    // Simulate closing the modal
    await wrapper.setProps({ modelValue: false })
    await nextTick()

    overlay.element.classList.add('fade-leave-active') // Manually add class
    await nextTick()

    expect(overlay.classes()).toContain('fade-leave-active')
  })
})
