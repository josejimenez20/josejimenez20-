<template>
  <div class="pantalla">
    <h1 class="titulo">Crear Cuenta</h1>
    <div class="card">
      <input v-model="nombre" placeholder="Nombre completo" />
      <input v-model="correo" placeholder="Correo electrónico" />
      <input v-model="contrasena" placeholder="Contraseña" type="password" />
      <button @click="registrar">Registrarse</button>
      <p class="enlace">
        ¿Ya tienes cuenta?
        <a @click.prevent="volverLogin" href="#">Iniciar sesión</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const nombre = ref('')
const correo = ref('')
const contrasena = ref('')

const registrar = async () => {
  if (!nombre.value.trim() || !correo.value.trim() || !contrasena.value.trim()) {
    toast.error('Completa todos los campos correctamente.')
    return
  }

  try {
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

    if (res.ok) {
      toast.success(data.mensaje || 'Registro exitoso')
      router.push('/login')
    } else {
      toast.error(data.mensaje || 'Error al registrar')
    }
  } catch (err) {
    toast.error('Error al registrar: conexión fallida')
  }
}

const volverLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
@import '../assets/sakura.css';
</style>
