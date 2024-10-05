import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/find',
      component: () => import('@/views/login/ForgetPasswordView.vue')
    },
    {
      path: '/query',
      component: () => import('@/views/using/queryView.vue')
    },
    {
      path: '/home',
      component: () => import('@/views/home/HomeIndexView.vue')
    },
    {
      path: '/history',
      component: () => import('@/views/home/HisrotyView.vue')
    }
  ]
})

export default router
