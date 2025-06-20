<template>
  <div class="start">
    <h1 class="title">Comienza tu Proyecto de Jardín</h1>

    <ul class="steps">
      <li
        v-for="(label, index) in steps"
        :key="index"
        :class="['step', { active: step === index + 1 }]"
        @click="setStep(index + 1)"
      >
        {{ label }}
      </li>
    </ul>

    <div class="content">
      <aside class="controls">
        <transition name="slide" mode="out-in">
          <div :key="step" class="step-section">
            <div v-if="step === 1">
              <h2 class="group-title">Selecciona un Estilo</h2>
              <div class="styles-grid">
                <button
                  v-for="style in styleOptions"
                  :key="style.name"
                  class="style-card"
                  :class="{ selected: selectedStyle === style.name }"
                  @click="selectedStyle = style.name"
                >
                  <div :class="['style-image', style.class]"></div>
                  <span class="style-label">{{ style.label }}</span>
                </button>
              </div>

              <h2 class="group-title">Tamaño del Jardín</h2>
              <div class="range-input">
                <input type="range" min="10" max="100" step="10" v-model="area" />
                <span class="range-value">{{ area }} m²</span>
              </div>
            </div>

            <div v-else-if="step === 2">
              <h2 class="group-title">Plantas recomendadas para tu ubicación</h2>
              <p v-if="ubicacion" class="ubicacion-msg">Ubicación detectada: <strong>{{ ubicacion }}</strong></p>
              <p v-else class="ubicacion-msg">Detectando ubicación...</p>
              <div class="plant-options">
                <label v-for="p in filteredPlants" :key="p" class="option-label">
                  <input type="checkbox" :value="p" v-model="selectedPlants" />
                  {{ p }}
                </label>
              </div>
            </div>

            <div v-else>
              <h2 class="group-title">Resumen</h2>
              <p><strong>Estilo:</strong> {{ selectedStyle }}</p>
              <p><strong>Tamaño:</strong> {{ area }} m²</p>
              <p><strong>Ubicación:</strong> {{ ubicacion }}</p>
              <p><strong>Plantas:</strong> {{ selectedPlants.join(', ') || '—' }}</p>
            </div>
          </div>
        </transition>
      </aside>

      <section class="preview">
        <h2 class="group-title">Vista Previa</h2>
        <div class="preview-box">
          <div class="preview-style">
            <span class="preview-label">Estilo:</span>
            <span>{{ selectedStyle }}</span>
          </div>
          <div class="preview-style">
            <span class="preview-label">Tamaño:</span>
            <span>{{ area }} m²</span>
          </div>
          <div class="preview-style">
            <span class="preview-label">Ubicación:</span>
            <span>{{ ubicacion || 'Detectando...' }}</span>
          </div>
          <div class="preview-style">
            <span class="preview-label">Plantas:</span>
            <span>{{ selectedPlants.length > 0 ? selectedPlants.join(', ') : '—' }}</span>
          </div>
        </div>
      </section>
    </div>

    <button class="btn-next" @click="step < steps.length ? nextStep() : finalize()">
      {{ step < steps.length ? 'Continuar' : 'Finalizar' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const step = ref(1)
const steps = ['Estilo', 'Plantas', 'Finalizar']
const setStep = (n) => (step.value = n)
const nextStep = () => { if (step.value < steps.length) step.value++ }
const finalize = () => {
  const resumen = {
    estilo: selectedStyle.value,
    tamanio: area.value,
    plantas: selectedPlants.value,
    ubicacion: ubicacion.value
  }
  localStorage.setItem('jardinResumen', JSON.stringify(resumen))
  router.push('/seleccionar')
}

const styleOptions = [
  { name: 'moderno', label: 'Moderno', class: 'modern' },
  { name: 'rustico', label: 'Rústico', class: 'rustico' },
  { name: 'minimalista', label: 'Minimalista', class: 'minimalista' },
  { name: 'natural', label: 'Natural', class: 'natural' }
]
const selectedStyle = ref(styleOptions[0].name)
const area = ref(50)
const plantOptions = ['Rosales', 'Lavanda', 'Helechos', 'Cactus', 'Orquídeas']
const selectedPlants = ref([])

const ubicacion = ref('')
const filteredPlants = ref([])

const filtrarPlantasPorUbicacion = (ubi) => {
  if (ubi.includes('Jiquilisco')) {
    filteredPlants.value = ['Cactus', 'Lavanda']
  } else if (ubi.includes('Usulután')) {
    filteredPlants.value = ['Rosales', 'Orquídeas']
  } else {
    filteredPlants.value = plantOptions
  }
}

onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        const data = await res.json()
        const muni = data?.address?.town || data?.address?.city || data?.address?.village || ''
        const depto = data?.address?.state || ''
        ubicacion.value = `${muni} ${depto}`
        filtrarPlantasPorUbicacion(ubicacion.value)
      } catch (error) {
        ubicacion.value = 'No se pudo obtener la ubicación'
        filteredPlants.value = plantOptions
      }
    }, () => {
      ubicacion.value = 'Permiso de ubicación denegado'
      filteredPlants.value = plantOptions
    })
  } else {
    ubicacion.value = 'Geolocalización no soportada'
    filteredPlants.value = plantOptions
  }
})
</script>

<style scoped>
@import './comenzar.css';

.preview-box {
  background: #fffdf8;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-style {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  border-bottom: 1px solid #e0c9b8;
  padding-bottom: 0.5rem;
}

.preview-label {
  font-weight: bold;
  color: #6e3b28;
}
</style>