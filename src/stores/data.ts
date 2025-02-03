import { ref } from 'vue'
export const rows = ref([
  {
    email: 'juozas@bybosas.lt',
    count: 10,
    tags: ['Customers', 'Premium', 'New'],
    name: 'Juozas Bybosas',
    country: 'Lithuania',
    date: '2019-12-04 09:10:29',
    isChecked: false,
  },
  {
    email: 'example@example.com',
    count: 5,
    tags: ['Customers', 'Oldtimer', 'Premium', 'New'],
    name: 'John Doe',
    country: 'USA',
    date: '2020-01-01 12:00:00',
    isChecked: false,
  },
  {
    email: 'example@example.com',
    count: 5,
    tags: ['Customers', 'VIP'],
    name: 'John Doe',
    country: 'USA',
    date: '2020-01-01 12:00:00',
    isChecked: false,
  },
  {
    email: 'example@example.com',
    count: 5,
    tags: ['Customers', 'New', 'premium'],
    name: 'John Doe',
    country: 'USA',
    date: '2020-01-01 12:00:00',
    isChecked: false,
  },
])
