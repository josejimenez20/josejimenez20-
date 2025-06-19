import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/view/Inicio.vue'
import Recomendaciones from '@/view/Recomendaciones.vue'
import Perfil from '@/view/Perfil.vue'

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/recomendaciones', name: 'Recomendaciones', component: Recomendaciones },
  { path: '/perfil', name: 'Perfil', component: Perfil },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router