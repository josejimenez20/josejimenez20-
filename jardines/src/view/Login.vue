<template>
  <div class="login">
    <section class="login-header">
      <div class="icon-circle">🔒</div>
      <div>
        <h1 class="title">Acceso a tu Jardín Personalizado</h1>
        <p class="subtitle">Ingresa tus credenciales para continuar</p>
      </div>
    </section>

    <section class="login-form-section">
      <form @submit.prevent="login" class="form-grid">
        <div class="form-field">
          <label>Correo electrónico</label>
          <input type="email" v-model.trim="email" required />
        </div>

        <div class="form-field">
          <label>Contraseña</label>
          <input type="password" v-model.trim="password" required />
        </div>

        <div class="form-button">
          <button type="submit" class="btn-login">Ingresar</button>
          <p class="login-note">
            ¿No tienes cuenta?
            <router-link to="/registro">Regístrate aquí</router-link>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

const login = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    toast.error('Debes completar todos los campos correctamente')
    return
  }

  try {
    const res = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email.value, password: password.value })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('usuarioActivo', JSON.stringify(data.usuario))
      toast.success('Inicio de sesión exitoso')
      router.push('/comenzar')
      return
    } else {
      toast.error(data.error || 'Credenciales incorrectas')
    }
  } catch {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const encontrado = usuarios.find(
      u => u.correo === email.value && u.password === password.value
    )

    if (encontrado) {
      localStorage.setItem('usuarioActivo', JSON.stringify(encontrado))
      toast.success('Inicio de sesión exitoso (modo local)')
      router.push('/comenzar')
    } else {
      toast.error('Credenciales incorrectas')
    }
  }
}
</script>
<style scoped>
:root {
  --primary: #eb1f81;
  --light-bg: #fdf0df;
  --dark-text: #0e1525;
  --gray: #555;
}

.login {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: var(--dark-text);
}

.login-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--light-bg);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  font-size: 18px;
  color: var(--gray);
  margin-top: 0.25rem;
}

.login-form-section {
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

.btn-login {
  background: var(--primary);
  color: #fff;
  font-size: 18px;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover {
  background: #cf1373;
}

.login-note {
  margin-top: 1rem;
  font-size: 16px;
}

.login-note a {
  color: var(--primary);
  text-decoration: none;
}
</style>
