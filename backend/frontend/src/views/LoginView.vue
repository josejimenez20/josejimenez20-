<template>
  <div class="pantalla">
    <h1 class="titulo">GarageCars Japan</h1>
    <div class="card">
      <h2>Login</h2>
      <input v-model="correo" placeholder="Correo" type="email" />
      <input v-model="contrasena" placeholder="Contraseña" type="password" />
      <button @click="loginUsuario">Iniciar sesión</button>
      <p class="enlace">
        ¿No tienes cuenta?
        <a @click.prevent="irARegistro" href="#">Crear una cuenta</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const router = useRouter()
const toast = useToast()

const correo = ref('')
const contrasena = ref('')

const loginUsuario = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/usuarios/login', {
      correo: correo.value,
      contrasena: contrasena.value
    })
    toast.success(res.data.mensaje)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
    router.push('/dashboard')
  } catch (err) {
    toast.error(err.response?.data?.mensaje || 'Error al iniciar sesión')
  }
}

const irARegistro = () => {
  router.push('/registro')
}
</script>

<style scoped>
@import '../assets/sakura.css';
</style>
