import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import SortableTable from '../SortableTable.vue'

describe('SortableTable', () => {
  it('renders properly', () => {
    const wrapper = mount(SortableTable, { props: { msg: 'Email' } })
    expect(wrapper.text()).toContain('Email')
  })
})
