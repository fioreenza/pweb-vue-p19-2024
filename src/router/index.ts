import { createRouter, createWebHistory } from 'vue-router'
import BookCatalog from '@/components/BookCatalog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'books',
      component: BookCatalog,
    },
    {
      path: '/:id',
      name: 'book-detail',
      component: () => import('@/components/BookDetail.vue'),
      props: true,
    }
  ],
})


export default router
