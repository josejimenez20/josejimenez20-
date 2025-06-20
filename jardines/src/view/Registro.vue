<template>
  <div class="register">
    <section class="register-header">
      <div class="avatar"></div>
      <h1 class="title">Crear Cuenta</h1>
    </section>

    <section class="register-section">
      <form @submit.prevent="registrarse" class="form-grid">
        <div class="form-field">
          <label>Nombre y Apellido</label>
          <input type="text" v-model.trim="nombre" required />
        </div>

        <div class="form-field">
          <label>Correo electrónico</label>
          <input type="email" v-model.trim="correo" required />
        </div>

        <div class="form-field">
          <label>Contraseña</label>
          <input type="password" v-model="password" required />
        </div>

        <div class="form-field">
          <label>Confirmar contraseña</label>
          <input type="password" v-model="confirmacion" required />
        </div>

        <div class="form-field" v-if="ubicacion">
          <label>Ubicación detectada</label>
          <input type="text" :value="ubicacion" disabled />
        </div>
        <div class="form-field" v-else>
          <label>Ubicación</label>
          <input type="text" value="Detectando ubicación..." disabled />
        </div>

        <div class="form-button">
          <button type="submit" class="btn-register">Registrarse</button>
          <p class="register-note">
            ¿Ya tienes cuenta?
            <router-link to="/login">Inicia sesión</router-link>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const nombre = ref('')
const correo = ref('')
const password = ref('')
const confirmacion = ref('')
const ubicacion = ref('')

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
      } catch {
        ubicacion.value = ''
      }
    }, () => {
      ubicacion.value = ''
    })
  }
})

// Validaciones de seguridad estricta
const isValidName = (name) => {
  const clean = name.trim()
  return clean.length >= 5 && /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+$/.test(clean)
}

const isValidEmail = (email) => {
  const trimmed = email.trim().toLowerCase()

  const domainPermitidos = [
    'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com',
    'ugb.edu.sv', 'live.com', 'icloud.com'
  ]

  // Patrón general de correo
  const basicPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  if (!basicPattern.test(trimmed)) return false

  const dominio = trimmed.split('@')[1]
  return domainPermitidos.includes(dominio)
}


const isStrongPassword = (pass) => {
  const trimmed = pass.trim()
  return trimmed.length >= 8 && /[A-Za-z]/.test(trimmed) && /\d/.test(trimmed)
}

const registrarse = async () => {
  if (!isValidName(nombre.value)) {
    toast.error('Ingresa tu nombre y apellido bien.')
    return
  }

  if (!isValidEmail(correo.value)) {
    toast.error('Correo electrónico inválido.')
    return
  }

  if (!isStrongPassword(password.value)) {
    toast.error('Contraseña insegura. Usa mínimo 8 caracteres con letras y números.')
    return
  }

  if (password.value !== confirmacion.value) {
    toast.error('Las contraseñas no coinciden.')
    return
  }

  if (!ubicacion.value || ubicacion.value.startsWith(',')) {
    toast.error('Ubicación inválida. Intenta de nuevo.')
    return
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
  if (usuarios.some(u => u.correo === correo.value)) {
    toast.error('Este correo ya está registrado.')
    return
  }

  // Guardar en local
  usuarios.push({
    nombre: nombre.value,
    correo: correo.value,
    password: password.value,
    ubicacion: ubicacion.value
  })
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  // Enviar a MongoDB
  try {
    const res = await fetch('http://localhost:3000/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre.value,
        correo: correo.value,
        password: password.value,
        ubicacion: ubicacion.value
      })
    })

    const data = await res.json()
    if (!res.ok) {
      toast.error(data.error || 'Error al guardar en la base de datos.')
      return
    }
  } catch {
    toast.warning('Registro local guardado. No se pudo conectar con MongoDB.')
  }

  toast.success('¡Registro exitoso!')
  router.push('/login')
}
</script>

<style scoped>
:root {
  --primary: #eb1f81;
  --light-bg: #fdf0df;
  --dark-text: #0e1525;
  --gray: #555;
}

.register {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: var(--dark-text);
}

.register-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--light-bg);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ccc;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.register-section {
  background: var(--light-bg);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: var(--gray);
}

.form-field input {
  padding: 0.6rem;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.form-button {
  grid-column: 1 / -1;
  text-align: center;
}

.btn-register {
  background: var(--primary);
  color: #fff;
  font-size: 18px;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-register:hover {
  background: #cf1373;
}

.register-note {
  margin-top: 1rem;
  font-size: 16px;
}

.register-note a {
  color: var(--primary);
  text-decoration: none;
}
</style>
