const HomeView = () => import('@/views/home/Home.vue')
const DashboardView = () => import('@/views/home/partials/Dashboard.vue')
const LoginView = () => import('@/views/external/partials/Login.vue')
const RegisterView = () => import('@/views/external/partials/Register.vue')
const ExternalView = () => import('@/views/external/External.vue')

export const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
    meta: { requiresAuth: true },
    redirect: 'dashboard/home',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard/:id',
        component: DashboardView
      }
    ]
  },
  {
    name: 'external',
    path: '/external',
    component: ExternalView,
    meta: { requiresAuth: false },
    redirect: 'login',
    children: [
      {
        name: 'login',
        path: '/login',
        component: LoginView
      },
      {
        name: 'register',
        path: '/register',
        component: RegisterView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]