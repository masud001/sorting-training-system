import { mount } from '@vue/test-utils'
import SortableTable from '@/components/SortableTable.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useStore } from '@/stores/store'
import draggable from 'vuedraggable'
import CustomCheckbox from '@/lib/CustomCheckbox.vue'
import TagComponent from '@/lib/TagComponent.vue'
import { beforeEach, describe, expect, it } from 'vitest'

describe('SortableTable', () => {
  let store: ReturnType<typeof useStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useStore()
  })

  it('Test case 1: renders the table with no data', () => {
    store.peoples = []
    const wrapper = mount(SortableTable, {
      global: {
        components: {
          draggable,
          CustomCheckbox,
          TagComponent,
        },
      },
    })

    expect(wrapper.find('tbody').text()).toContain('No data available')
    expect(wrapper.find('tbody').text()).toContain(
      'Please add people data by clicking on the "Start Sorting" button above.',
    )
  })

  it('Test case 2: renders the table with data', () => {
    store.peoples = [
      {
        email: 'john@example.com',
        potatoes: 5,
        tags: ['tag1', 'tag2'],
        name: 'John Doe',
        country: 'USA',
        date: '2023-10-01',
        isChecked: false,
      },
    ]
    const wrapper = mount(SortableTable, {
      global: {
        components: {
          draggable,
          CustomCheckbox,
          TagComponent,
        },
      },
    })

    expect(wrapper.find('tbody').text()).toContain('john@example.com')
    expect(wrapper.find('tbody').text()).toContain('John Doe')
    expect(wrapper.find('tbody').text()).toContain('USA')
    expect(wrapper.find('tbody').text()).toContain('2023-10-01')
  })

  it('Test case 3: renders the correct number of people in the list', () => {
    store.peoples = [
      {
        email: 'john@example.com',
        potatoes: 5,
        tags: ['tag1', 'tag2'],
        name: 'John Doe',
        country: 'USA',
        date: '2023-10-01',
        isChecked: false,
      },
      {
        email: 'jane@example.com',
        potatoes: 3,
        tags: ['tag3'],
        name: 'Jane Doe',
        country: 'Canada',
        date: '2023-10-02',
        isChecked: true,
      },
    ]
    const wrapper = mount(SortableTable, {
      global: {
        components: {
          draggable,
          CustomCheckbox,
          TagComponent,
        },
      },
    })

    expect(wrapper.find('[aria-label="table-heading"]').text()).toContain('2 people in the list')
  })

  it('Test case 4: disables the table when store.success is true', () => {
    store.peoples = [
      {
        email: 'john@example.com',
        potatoes: 5,
        tags: ['tag1', 'tag2'],
        name: 'John Doe',
        country: 'USA',
        date: '2023-10-01',
        isChecked: false,
      },
    ]
    store.success = true
    const wrapper = mount(SortableTable, {
      global: {
        components: {
          draggable,
          CustomCheckbox,
          TagComponent,
        },
      },
    })

    expect(wrapper.find('table').attributes('disabled')).toBe('true')
  })

  it('Test case 5: drag-and-drop functionality works correctly', async () => {
    store.peoples = [
      {
        email: 'john@example.com',
        potatoes: 5,
        tags: ['tag1', 'tag2'],
        name: 'John Doe',
        country: 'USA',
        date: '2023-10-01',
        isChecked: false,
      },
      {
        email: 'jane@example.com',
        potatoes: 3,
        tags: ['tag3'],
        name: 'Jane Doe',
        country: 'Canada',
        date: '2023-10-02',
        isChecked: true,
      },
    ]
    const wrapper = mount(SortableTable, {
      global: {
        components: {
          draggable,
          CustomCheckbox,
          TagComponent,
        },
      },
    })

    const draggableComponent = wrapper.findComponent(draggable)
    draggableComponent.vm.$emit('start')
    expect(wrapper.vm.drag).toBe(true)

    draggableComponent.vm.$emit('end')
    expect(wrapper.vm.drag).toBe(false)
  })
})
