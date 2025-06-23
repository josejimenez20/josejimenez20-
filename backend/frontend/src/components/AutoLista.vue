<template>
  <div class="lista">
    <h2>Autos Registrados</h2>
    <ul>
      <li v-for="auto in autos" :key="auto._id">
        {{ auto.marca }} {{ auto.modelo }} - {{ auto.año }} ({{ auto.color }}) | Placa: {{ auto.placa }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      autos: [],
    };
  },
  methods: {
    async cargarAutos() {
      const res = await axios.get('http://localhost:3000/api/autos');
      this.autos = res.data;
    },
  },
  mounted() {
    this.cargarAutos();
  },
  watch: {
    $route() {
      this.cargarAutos();
    },
  },
};
</script>

<style scoped>
.lista {
  margin-top: 30px;
}
</style>
