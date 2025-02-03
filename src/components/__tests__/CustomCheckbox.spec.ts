import { mount } from '@vue/test-utils'
import CustomCheckbox from '@/lib/CustomCheckbox.vue' // Adjust the path as needed
import { describe, expect, it } from 'vitest'

describe('CustomCheckbox', () => {
  it('Test Case 1: renders the checkbox and label correctly', () => {
    const label = 'Test Checkbox'
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false,
        label,
      },
    })

    // Check if the label text is correct
    expect(wrapper.find('label').text()).toBe(label)

    // Check if the checkbox div is rendered correctly
    expect(wrapper.find('div.cursor-pointer').exists()).toBe(true) // Adjusted selector

    // Check if the checkbox has the correct default styles (unchecked state)
    const checkbox = wrapper.find('div.cursor-pointer')
    expect(checkbox.classes()).toContain('border-gray-400')
    expect(checkbox.classes()).not.toContain('bg-primary')

    // Ensure the checkmark SVG is not visible when unchecked
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('Test Case 2: toggles the checkbox state when clicked', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false, // Initial state is false
        label: 'Test Checkbox',
      },
    })

    // Click the checkbox for the first time
    await wrapper.find('div.cursor-pointer').trigger('click')

    // Check if the modelValue is updated to true
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]) // First click toggles to true

    // Update the prop to reflect the new state
    await wrapper.setProps({ modelValue: true })

    // Click the checkbox for the second time
    await wrapper.find('div.cursor-pointer').trigger('click')

    // Check if the modelValue is updated to false
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]) // Second click toggles back to false
  })

  it('Test Case 3: emits the correct event when toggled', async () => {
    const rowData = { email: 'mm@gmail.com', name: 'Test Row' }
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false, // Initial state is false
        label: 'Test Checkbox',
        rowData,
      },
    })

    // Click the checkbox
    await wrapper.find('div.cursor-pointer').trigger('click') // Use the correct selector

    // Check if the correct events are emitted
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]) // First click toggles to true

    expect(wrapper.emitted('row-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')?.[0]).toEqual([rowData, true]) // row-click event with rowData and new value
  })

  it('Test Case 4: applies the correct styles based on the modelValue prop', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false, // Initial state is false
        label: 'Test Checkbox',
      },
    })

    // Find the checkbox element
    const checkbox = wrapper.find('div.cursor-pointer')

    // Check initial styles when modelValue is false
    expect(checkbox.classes()).toContain('border-gray-400') // Should have border-gray-400
    expect(checkbox.classes()).not.toContain('bg-primary') // Should not have bg-primary
    expect(checkbox.classes()).not.toContain('border-primary') // Should not have border-primary

    // Update modelValue to true
    await wrapper.setProps({ modelValue: true })

    // Check styles when modelValue is true
    expect(checkbox.classes()).toContain('bg-primary') // Should have bg-primary
    expect(checkbox.classes()).toContain('border-primary') // Should have border-primary
    expect(checkbox.classes()).not.toContain('border-gray-400') // Should not have border-gray-400
  })

  it('Test Case 5: emits the row-click event with the correct data', async () => {
    const rowData = { email: 'test@gmail.com', name: 'Test Row' }
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false, // Initial state is false
        label: 'Test Checkbox',
        rowData,
      },
    })

    // Click the checkbox
    await wrapper.find('div.cursor-pointer').trigger('click') // Use the correct selector

    // Check if the row-click event is emitted with the correct data
    expect(wrapper.emitted('row-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')?.[0]).toEqual([rowData, true]) // row-click event with rowData and new value
  })

  it('Test Case 6: toggles the checkbox state when clicked (initial state is true)', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: true, // Initial state is true
        label: 'Test Checkbox',
      },
    })

    // Click the checkbox for the first time
    await wrapper.find('div.cursor-pointer').trigger('click')

    // Check if the modelValue is updated to false
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]) // First click toggles to false

    // Update the prop to reflect the new state
    await wrapper.setProps({ modelValue: false })

    // Click the checkbox for the second time
    await wrapper.find('div.cursor-pointer').trigger('click')

    // Check if the modelValue is updated to true
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([true]) // Second click toggles back to true
  })
})
