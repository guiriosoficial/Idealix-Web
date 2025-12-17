import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

Vue.use(Router)

const router = new Router({
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
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Store.getters.isLoggedIn ? next() : next('login')
  } else if (from.query.token) {
    next(false)
  } else {
    next()
  }
})

export default router
