import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/front/LayoutPage.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/front/HomePage.vue'),
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('@/views/front/ProductIntroduction.vue'),
        },
        {
          path: '/message',
          name: 'message',
          component: () => import('@/views/front/OnlineMessage.vue'),
        },
        {
          path: '/food-details',
          name: 'food-details',
          component: () => import('@/views/front/FoodDetails.vue'),
        },
        {
          path: '/information-center',
          name: 'information-center',
          component: () => import('@/views/front/InformationCenter.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/views/front/ContactUs.vue'),
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/front/ArticlePage.vue'),
        },
        {
          path: '/my-collection',
          name: 'my-collection',
          component: () => import('@/views/front/UserCollect.vue'),
        },
      ],
    },
    {
      path: '/userlogin',
      name: 'userlogin',
      component: () => import('@/views/front/UserLogin.vue'),
    },

    // 后台路由设置
    {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: () => import('@/views/admin/AdminLogin.vue'),
    },
    {
      path: '/AdminLayout',
      name: 'AdminLayout',
      component: () => import('@/views/admin/AdminLayout.vue'),
      redirect: '/AdminHome',
      children: [
        {
          path: '/AdminHome',
          name: 'AdminHome',
          component: () => import('@/views/admin/AdminHome.vue'),
        },
        {
          path: '/BrandProducts',
          name: 'BrandProducts',
          component: () => import('@/views/admin/brand/BrandProducts.vue'),
        },
        {
          path: '/AnnouncementManagement',
          name: 'AnnouncementManagement',
          component: () => import('@/views/admin/Announcement/AnnouncementManagement.vue'),
        },
        {
          path: '/UserManagement',
          name: 'UserManagement',
          component: () => import('@/views/admin/UserAdmin/UserAdmin.vue'),
        },
        {
          path: '/ClassificationManagement',
          name: 'ClassificationManagement',
          component: () => import('@/views/admin/ClassificationManagement.vue/ClassificationManagement.vue'),
        },
        {
          path: '/AddProduct',
          name: 'AddProduct',
          component: () => import('@/views/admin/brand/AddProduct.vue'),
        },
      ],
    },
  ],
})

export default router
