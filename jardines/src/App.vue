<template>
  <div>
    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/recomendaciones">Recomendaciones</router-link> |
      <router-link to="/perfil">Perfil</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 16px;
  background: #e6d6c5;
  font-weight: bold;
}
router-link {
  margin: 0 10px;
  text-decoration: none;
  color: #6e3b28;
}
</style>