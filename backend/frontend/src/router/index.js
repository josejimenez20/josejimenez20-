import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/registro', component: RegistroView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiereAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const estaLogueado = !!localStorage.getItem('token')
  if (to.meta.requiereAuth && !estaLogueado) {
    next('/login')
  } else {
    next()
  }
})

export default router
