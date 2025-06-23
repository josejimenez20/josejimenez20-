<template>
  <div class="pantalla">
    <h1 class="titulo">🚗 GarageCars Japan</h1>

    <!-- Formulario para agregar vehículo -->
    <div class="contenedor">
      <div class="formulario">
        <h2>Agregar Vehículo</h2>
        <input type="text" v-model="nombre" placeholder="Nombre del vehículo" />
        <input type="number" v-model="anio" placeholder="Año" />
        <input type="file" @change="onFileChange" accept="image/*" />

        <div v-if="imagenPreview" class="preview">
          <img :src="imagenPreview" alt="Vista previa" />
        </div>

        <button @click="agregarVehiculo">Guardar Vehículo</button>
      </div>

      <!-- Lista de vehículos del usuario -->
      <div class="lista">
        <h2>Tus Vehículos</h2>
        <div v-if="vehiculos.length === 0" class="mensaje-vacio">
          Aún no has agregado vehículos.
        </div>
        <div
          class="vehiculo-card"
          v-for="(auto, index) in vehiculos"
          :key="index"
        >
          <img :src="auto.imagen" alt="Imagen del vehículo" />
          <div class="info">
            <p><strong>{{ auto.nombre }}</strong></p>
            <p>Año: {{ auto.anio }}</p>
          </div>
        </div>
      </div>
    </div>

    <button class="cerrar" @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const nombre = ref('')
const anio = ref('')
const imagen = ref(null)
const imagenPreview = ref(null)
const vehiculos = ref([])
const usuario = ref(null)

onMounted(async () => {
  const datos = localStorage.getItem('usuario')
  if (!datos) return router.push('/login')

  usuario.value = JSON.parse(datos)
  await cargarVehiculos()
})

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imagen.value = file
    imagenPreview.value = URL.createObjectURL(file)
  }
}

const agregarVehiculo = async () => {
  if (!nombre.value || !anio.value || !imagen.value) {
    alert('Completa todos los campos')
    return
  }

  const formData = new FormData()
  formData.append('nombre', nombre.value)
  formData.append('anio', anio.value)
  formData.append('imagen', imagen.value)
  formData.append('correo', usuario.value.correo)

  try {
    const res = await axios.post('http://localhost:3000/api/vehiculos', formData)
    vehiculos.value.push(res.data)
    nombre.value = ''
    anio.value = ''
    imagen.value = null
    imagenPreview.value = null
  } catch (err) {
    alert('Error al guardar el vehículo')
  }
}

const cargarVehiculos = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/vehiculos/${usuario.value.correo}`)
    vehiculos.value = res.data
  } catch (err) {
    vehiculos.value = []
  }
}

const cerrarSesion = () => {
  localStorage.removeItem('usuario')
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.pantalla {
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #0e0b1c;
  min-height: 100vh;
  color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.contenedor {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 12px;
  box-sizing: border-box;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #ff79c6;
  background-color: #2d253f;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
}

.formulario,
.lista {
  background: #1f1a2e;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 0 24px rgba(255, 105, 180, 0.25);
  width: 100%;
}

.formulario h2,
.lista h2 {
  margin-bottom: 16px;
  color: #ffc9e1;
  font-size: 1.3rem;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border-radius: 10px;
  border: 1px solid #ff79c6;
  background-color: #2d253f;
  color: white;
  font-size: 1rem;
  outline: none;
}

input::file-selector-button {
  background-color: #ff5fa2;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
}

.preview {
  margin: 12px 0;
  text-align: center;
}

.preview img {
  max-width: 100%;
  max-height: 250px;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(255, 105, 180, 0.4);
}

.formulario button {
  background-color: #ff5fa2;
  color: white;
  border: none;
  padding: 12px;
  font-weight: bold;
  border-radius: 12px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}
.formulario button:hover {
  background-color: #ff77b3;
  transform: scale(1.03);
}

.mensaje-vacio {
  color: #aaa;
  font-style: italic;
  text-align: center;
  padding: 10px;
}

.vehiculo-card {
  background-color: #2c213f;
  border: 1px solid #ff79c6;
  border-radius: 14px;
  padding: 12px;
  margin-bottom: 16px;
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 0 16px rgba(255, 105, 180, 0.2);
}

.vehiculo-card img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #ffb6da;
}

.info p {
  margin: 0;
  font-size: 0.95rem;
}

.cerrar {
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #ff5fa2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
}

.cerrar:hover {
  background-color: #ff7fb7;
  transform: scale(1.05);
}
</style>
