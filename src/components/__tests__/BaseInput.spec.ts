import { mount } from '@vue/test-utils'
import BaseInput from '@/lib/BaseInput.vue'
import { describe, expect, it } from 'vitest'

describe('BaseInput', () => {
  it('Test case 1: renders the input component with default props', () => {
    const wrapper = mount(BaseInput)
    // Check if label exists (should not be rendered if no label is provided)
    expect(wrapper.find('label').exists()).toBe(false)
    // Check input placeholder
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter a value')
    // Check input type
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('Test case 2: emits update:modelValue event', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('new value')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy() // Check if the event was emitted
    if (emitted) {
      expect(emitted[0]).toEqual(['new value']) // Access the emitted event safely
    }
  })

  it('Test case 3: validates number input within the specified range', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'number',
        min: 20,
        max: 100,
      },
    })
    const input = wrapper.find('input')
    await input.setValue('50')
    expect(wrapper.vm.errorMessage).toBe('')
    expect(wrapper.vm.successMessage).toBe('Value is within the valid range.')
  })

  it('Test case 4: validates number input outside the specified range', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'number',
        min: 20,
        max: 100,
      },
    })
    const input = wrapper.find('input')
    await input.setValue('10')
    expect(wrapper.vm.errorMessage).toBe('Value must be between 20 and 100.')
    expect(wrapper.vm.successMessage).toBe('')
  })

  it('Test case 5: validates non-numeric input for number type', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'number',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('abc')
    expect(wrapper.vm.errorMessage).toBe('Please enter a valid number.')
    expect(wrapper.vm.successMessage).toBe('')
  })

  it('Test case 6: validates non-number input types', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'text',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.vm.errorMessage).toBe('')
    expect(wrapper.vm.successMessage).toBe('')
  })

  it('Test case 7: updates input value when modelValue prop changes', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'initial',
      },
    })
    await wrapper.setProps({ modelValue: 'updated' })
    expect(wrapper.find('input').element.value).toBe('updated')
  })

  it('Test case 8: applies correct CSS classes based on validation state', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'number',
        min: 20,
        max: 100,
      },
    })
    const input = wrapper.find('input')
    await input.setValue('10')
    expect(wrapper.find('input').classes()).toContain('border-error')
    await input.setValue('50')
    expect(wrapper.find('input').classes()).toContain('border-success')
  })
})
