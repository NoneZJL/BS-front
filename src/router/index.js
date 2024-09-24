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
      path: '/register',
      component: () => import('@/views/login/RegisterView.vue')
    }
  ]
})

export default router
