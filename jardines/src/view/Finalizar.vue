<template>
  <div class="finalizar">
    <h1 class="title">Resumen de tu Jardín</h1>

    <div v-if="resumen">
      <div class="resumen-card">
        <p><strong>Estilo elegido:</strong> {{ resumen.estilo }}</p>
        <p><strong>Tamaño del jardín:</strong> {{ resumen.tamanio }} m²</p>
        <p><strong>Ubicación detectada:</strong> {{ resumen.ubicacion }}</p>
        <p><strong>Plantas seleccionadas:</strong></p>
        <ul class="plant-list">
          <li v-for="(p, i) in resumen.plantas" :key="i"> {{ p }}</li>
        </ul>
      </div>

      <button class="btn-confirm" @click="confirmarJardin">Confirmar Jardín</button>
    </div>

    <div v-else>
      <p>No hay datos disponibles. Por favor, vuelve al inicio.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const resumen = ref(null)

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('jardinResumen'))
  if (data) {
    resumen.value = data
  }
})

function confirmarJardin() {
  toast.success('Tu jardín ha sido registrado exitosamente.')
  localStorage.removeItem('jardinResumen')
  router.push('/')
}
</script>

<style scoped>
.finalizar {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #0e1525;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 2rem;
  color: #6e3b28;
}

.resumen-card {
  background: #fdf0df;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.resumen-card p {
  margin-bottom: 1rem;
}

.plant-list {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.plant-list li {
  margin-bottom: 0.5rem;
  font-size: 18px;
}

.btn-confirm {
  display: block;
  margin: 0 auto;
  padding: 0.75rem 2rem;
  font-size: 18px;
  background: linear-gradient(135deg, #eb1f81 0%, #cf1373 100%);
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-confirm:hover {
  background: #c9186b;
}
</style>