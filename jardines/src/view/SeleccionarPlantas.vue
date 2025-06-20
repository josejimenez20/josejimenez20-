<template>
  <div class="select-plants">
    <h1 class="title">Elige tus Plantas</h1>

    <p v-if="ubicacion" class="location-info">
      Ubicación detectada: <strong>{{ ubicacion }}</strong>
    </p>
    <p v-else class="location-info">Detectando ubicación...</p>

    <input
      class="search"
      type="text"
      v-model="query"
      placeholder="Buscar planta..."
    />

    <div class="plants-grid">
      <div class="plant-card" v-for="(plant, index) in filteredPlants" :key="index">
        <div class="plant-img"></div>
        <h3>{{ plant.name }}</h3>
        <button class="btn-add" @click="addPlant(plant)">Añadir</button>
      </div>
    </div>

    <button class="btn-next" @click="goNext">Siguiente</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const query = ref('')
const plants = ref([])
const selected = ref([])
const ubicacion = ref('')

const filteredPlants = computed(() =>
  plants.value.filter(p =>
    p.name.toLowerCase().includes(query.value.toLowerCase())
  )
)

function addPlant(plant) {
  if (!selected.value.includes(plant.name)) {
    selected.value.push(plant.name)
    toast.success(`${plant.name} añadida a tus plantas seleccionadas`)
  } else {
    toast.info(`${plant.name} ya está seleccionada`)
  }
}

function goNext() {
  if (selected.value.length === 0) {
    toast.error('Debes seleccionar al menos una planta para continuar')
    return
  }
  localStorage.setItem('jardinResumen', JSON.stringify({
    plantas: selected.value,
    ubicacion: ubicacion.value
  }))
  router.push('/finalizar')
}

onMounted(() => {
  const resumen = JSON.parse(localStorage.getItem('jardinResumen'))
  if (resumen) {
    ubicacion.value = resumen.ubicacion
    plants.value = resumen.plantas.map(nombre => ({ name: nombre }))
  } else {
    ubicacion.value = 'No hay información previa'
    plants.value = []
  }
})
</script>

<style scoped>
.select-plants {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #0e1525;
}
.location-info {
  font-size: 16px;
  margin-bottom: 1rem;
  color: #6e3b28;
  text-align: center;
}
.title {
  font-size: 20px;
  margin-bottom: 1rem;
  text-align: center;
}
.search {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}
.plants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.plant-card {
  background: #fdf0df;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}
.plant-card:hover {
  transform: translateY(-3px);
}
.plant-img {
  width: 100%;
  height: 120px;
  background: #e7d5c3;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}
.btn-add {
  padding: 0.5rem 1rem;
  font-size: 18px;
  border: none;
  background-image: linear-gradient(135deg, #eb1f81 0%, #cf1373 100%);
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-add:hover {
  background: #bf126a;
}
.btn-next {
  display: block;
  text-align: center;
  padding: 0.75rem 2rem;
  font-size: 18px;
  background: linear-gradient(135deg, #eb1f81 0%, #cf1373 100%);
  color: #fff;
  border-radius: 0.5rem;
  margin: 0 auto;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-next:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
@media (max-width: 768px) {
  .plants-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 480px) {
  .plants-grid {
    grid-template-columns: 1fr;
  }
}
</style>