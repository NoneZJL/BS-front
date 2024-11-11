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
    },
    {
      path: '/remainder',
      component: () => import('@/views/home/ReducePriceView.vue')
    },
    {
      path: '/detail',
      component: () => import('@/views/using/detailView.vue')
    }
  ]
})

const needLoginPath = ['/query', '/home', '/history', '/remainder', '/detail']

router.beforeEach((to, from, next) => {
  const isToNeedLogin = needLoginPath.includes(to.path)
  const isFromNeedLogin = needLoginPath.includes(from.path)

  if (isToNeedLogin && !isFromNeedLogin) {
    ElMessage.error('请先登录')
    next('/login')
  } else {
    next()
  }
})

export default router
