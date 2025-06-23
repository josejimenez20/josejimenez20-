<template>
  <div class="formulario">
    <h2>Login</h2>
    <input v-model="correo" placeholder="Correo" type="email" />
    <input v-model="contrasena" placeholder="Contraseña" type="password" />
    <button @click="loginUsuario">Iniciar sesión</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      correo: '',
      contrasena: ''
    }
  },
  methods: {
    async loginUsuario() {
      try {
        const res = await axios.post('http://localhost:3000/api/usuarios/login', {
          correo: this.correo,
          contrasena: this.contrasena
        });
        alert(res.data.mensaje);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

        // Redirigir al dashboard
        this.$router.push('/dashboard')
      } catch (err) {
        alert(err.response?.data?.mensaje || 'Error al iniciar sesión');
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/sakura.css';

.formulario {
  max-width: 400px;
  margin: 80px auto;
  background-color: #1c1c1c;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(255, 192, 203, 0.25);
  color: #fceff9;
}

input {
  padding: 10px;
  font-size: 16px;
  background-color: #2d2d2d;
  border: 1px solid #ff77aa;
  color: #fff;
  border-radius: 8px;
}

input:focus {
  outline: none;
  border-color: #ffaad4;
}

button {
  padding: 12px;
  background-color: #ff5c8a;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  font-weight: bold;
  transition: background 0.3s;
}

button:hover {
  background-color: #ff7ba5;
}
</style>
