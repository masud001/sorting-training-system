import { mount } from '@vue/test-utils'
import TagComponent from '@/lib/TagComponent.vue'
import { describe, expect, it } from 'vitest'

describe('TagComponent', () => {
  it('Test case 1: renders the first two tags correctly', () => {
    const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4']
    const wrapper = mount(TagComponent, {
      props: {
        tags,
      },
    })

    // Check if the first two tags are rendered
    const renderedTags = wrapper.findAll('.text-x.text-gray-300.bg-gray-700')
    expect(renderedTags.length).toBe(2)
    expect(renderedTags[0].text()).toBe('Tag1')
    expect(renderedTags[1].text()).toBe('Tag2')
  })

  it('Test case 2: displays the remaining tags count when there are more than two tags', () => {
    const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4']
    const wrapper = mount(TagComponent, {
      props: {
        tags,
      },
    })

    // Check if the remaining tags count is displayed
    const remainingCount = wrapper.find('.text-xx.text-gray-300')
    expect(remainingCount.exists()).toBe(true)
    expect(remainingCount.text()).toBe('(+2)')
  })

  it('Test case 3: does not display the remaining tags count when there are two or fewer tags', () => {
    const tags = ['Tag1', 'Tag2']
    const wrapper = mount(TagComponent, {
      props: {
        tags,
      },
    })

    // Check if the remaining tags count is not displayed
    const remainingCount = wrapper.find('.text-xx.text-gray-300')
    expect(remainingCount.exists()).toBe(false)
  })

  it('Test case 4: displays the correct tooltip for the remaining tags count', () => {
    const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4']
    const wrapper = mount(TagComponent, {
      props: {
        tags,
      },
    })

    // Check if the tooltip contains the correct remaining tags
    const remainingCount = wrapper.find('.text-xx.text-gray-300')
    expect(remainingCount.attributes('title')).toBe('Tag3, Tag4')
  })
})
