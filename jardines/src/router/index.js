import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/view/Inicio.vue'
import Recomendaciones from '@/view/Recomendaciones.vue'
import Perfil from '@/view/Perfil.vue'
import Comenzar from '@/view/Comenzar.vue'
import SeleccionarPlantas from '@/view/SeleccionarPlantas.vue'
import Login from '@/view/Login.vue'
import Registro from '@/view/Registro.vue'
import Finalizar from '@/view/Finalizar.vue'

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/recomendaciones', name: 'Recomendaciones', component: Recomendaciones },
  { path: '/perfil', name: 'Perfil', component: Perfil },
  { path: '/comenzar', name: 'Comenzar', component: Comenzar },
  { path: '/seleccionar', name: 'SeleccionarPlantas', component: SeleccionarPlantas },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registro', name: 'Registro', component: Registro },
  { path: '/finalizar', name: 'Finalizar', component: Finalizar },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router