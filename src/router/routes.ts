const HomeView = () => import('@/views/home/HomeView.vue')
const DashboardView = () => import('@/views/home/partials/Dashboard.vue')
const LoginView = () => import('@/views/external/partials/LoginForm.vue')
const RegisterView = () => import('@/views/external/partials/RegisterForm.vue')
const ExternalView = () => import('@/views/external/ExternalView.vue')

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