import { useAccountStore } from '@/store/account'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/home/Home.vue'),
      meta: { requiresAuth: true },
      redirect: 'dashboard/home',
      children: [
        {
          name: 'dashboard',
          path: '/dashboard/:id',
          component: () => import('@/views/home/partials/Dashboard.vue')
        }
      ]
    },
    {
      name: 'external',
      path: '/external',
      component: () => import('@/views/external/External.vue'),
      meta: { requiresAuth: false },
      redirect: 'login',
      children: [
        {
          name: 'login',
          path: '/login',
          component: () => import('@/views/external/partials/Login.vue')
        },
        {
          name: 'register',
          path: '/register',
          component: () => import('@/views/external/partials/Register.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const accountStore = useAccountStore()
    accountStore.isLoggedIn ? next() : next('login')
  } else if (from.query.token) {
    next(false)
  } else {
    next()
  }
})

export default router
