import { useAccountStore } from '@/store/account'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
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
