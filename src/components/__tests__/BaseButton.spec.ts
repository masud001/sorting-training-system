import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BaseButton from '@/lib/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('Test case 1: renders a button element when href is not provided', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.text()).toBe('Click Me')
  })

  it('Test case 2: renders an anchor element when href is provided', () => {
    const wrapper = mount(BaseButton, {
      props: {
        href: 'https://example.com',
      },
      slots: {
        default: 'Visit Link',
      },
    })

    const anchorElement = wrapper.find('a')
    expect(anchorElement.exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
    expect(anchorElement.text()).toBe('Visit Link')
    expect(anchorElement.attributes('href')).toBe('https://example.com')
    expect(anchorElement.attributes('target')).toBe('_blank')
    expect(anchorElement.attributes('rel')).toBe('noopener noreferrer')
  })

  it('Test case 3: applies the correct variant class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary',
      },
    })

    // Ensure the component renders either a button or a link
    const button = wrapper.find('button')
    const link = wrapper.find('a')
    const element = button.exists() ? button : link
    // Check if the correct class is applied
    expect(element.classes()).toContain('bg-primary')
  })

  it('Test case 4: applies disabled styles when disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })

    // Ensure the component renders either a button or a link
    const button = wrapper.find('button')
    const link = wrapper.find('a')
    const element = button.exists() ? button : link
    // Check for disabled styles
    expect(element.classes()).toContain('opacity-50')
    expect(element.classes()).toContain('cursor-not-allowed')
    // Check if the button is actually disabled
    if (button.exists()) {
      expect(button.attributes('disabled')).toBeDefined()
    }
  })

  it('Test case 5: prevents click events when disabled', async () => {
    const onClick = vi.fn()
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
        onClick,
      },
    })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('Test case 6: executes the onClick handler when clicked', async () => {
    const onClick = vi.fn()
    const wrapper = mount(BaseButton, {
      props: {
        onClick,
      },
    })

    // Ensure the correct element is selected (button or link)
    const button = wrapper.find('button')
    const link = wrapper.find('a')

    const element = button.exists() ? button : link
    // Trigger click event
    await element.trigger('click')
    // Expect the function to have been called
    expect(onClick).toHaveBeenCalled()
  })

  it('Test case 7: renders the default slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Custom Content',
      },
    })
    expect(wrapper.text()).toBe('Custom Content')
  })

  it('Test case 8: applies the correct type attribute for button', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'submit',
      },
    })
    // Find the button element (should exist since `href` is not provided)
    const button = wrapper.find('button')
    // Ensure the button exists and has the correct type attribute
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('submit')
  })

  it('Test case 9: applies the correct target and rel attributes for link', () => {
    const wrapper = mount(BaseButton, {
      props: {
        href: 'https://example.com',
        target: '_blank',
        rel: 'nofollow',
      },
    })

    // Find the <a> element since href is provided
    const link = wrapper.find('a')

    // Ensure the <a> tag is rendered
    expect(link.exists()).toBe(true)

    // Check if it has the correct attributes
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('nofollow')
  })
})
