<template>
  <form @submit.prevent="registrarAuto" class="form">
    <h2>Registrar Auto</h2>
    <input v-model="auto.marca" placeholder="Marca" required />
    <input v-model="auto.modelo" placeholder="Modelo" required />
    <input v-model="auto.año" type="number" placeholder="Año" required />
    <input v-model="auto.color" placeholder="Color" required />
    <input v-model="auto.placa" placeholder="Placa" required />
    <button type="submit">Guardar</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      auto: {
        marca: '',
        modelo: '',
        año: '',
        color: '',
        placa: '',
      },
    };
  },
  methods: {
    async registrarAuto() {
      try {
        await axios.post('http://localhost:3000/api/autos', this.auto);
        alert('Auto registrado');
        this.$emit('auto-agregado');
        this.auto = { marca: '', modelo: '', año: '', color: '', placa: '' };
      } catch (err) {
        alert('Error al guardar');
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}
input, button {
  padding: 10px;
  font-size: 16px;
}
</style>
