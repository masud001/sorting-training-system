import { createRouter, createWebHistory } from 'vue-router'
import SortingView from '../views/SortingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sort',
      component: SortingView,
    },
  ],
})

export default router
