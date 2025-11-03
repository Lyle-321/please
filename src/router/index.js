import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/LayoutPage.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomePage.vue'),
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('@/views/ProductIntroduction.vue'),
        },
        {
          path: '/message',
          name: 'message',
          component: () => import('@/views/OnlineMessage.vue'),
        },
      ],
    },
  ],
})

export default router
