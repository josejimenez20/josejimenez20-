<template>
  <div class="registro-wrapper">
    <div class="card">
      <h2>Crear Cuenta</h2>
      <input v-model="nombre" placeholder="Nombre completo" />
      <input v-model="correo" placeholder="Correo electrónico" />
      <input v-model="contrasena" placeholder="Contraseña" type="password" />
      <button @click="registrar">Registrarse</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nombre = ref('')
const correo = ref('')
const contrasena = ref('')

const registrar = async () => {
  if (!nombre.value || !correo.value || !contrasena.value) {
    alert('Completa todos los campos')
    return
  }

  const res = await fetch('http://localhost:3000/api/usuarios/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombre.value,
      correo: correo.value,
      contrasena: contrasena.value
    })
  })

  const data = await res.json()
  if (data.ok) {
    router.push('/login')
  } else {
    alert(data.msg)
  }
}
</script>

<style scoped>
@import '../assets/sakura.css';

.registro-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  background-image: url('/sakura-bg.png'); /* opcional si tienes fondo */
  background-size: cover;
  padding: 20px;
}

.card {
  background-color: #2d2d2d;
  border: 2px solid #ff79c6;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 0 25px rgba(255, 192, 203, 0.3);
  color: #fceff9;
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.6s ease-out;
}

.card h2 {
  text-align: center;
  color: #ffaad4;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  background-color: #3b3b3b;
  border: 1px solid #ffb3d1;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #ff7eb9;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #ff5c8a;
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

button:hover {
  background-color: #ff7ba5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
