<template>
  <div class="profile">
    <section class="profile-header">
      <div class="avatar"></div>
      <div class="user-info">
        <h1 class="name">Nombre de Usuario</h1>
        <p class="email">usuario@ejemplo.com</p>
      </div>
      <button class="btn-edit">Editar Perfil</button>
    </section>

    <section class="profile-section">
      <h2 class="section-title">Tus Plantas Favoritas</h2>
      <div class="favorites-grid">
        <div class="fav-card" v-for="n in 4" :key="n">
          <div class="fav-image"></div>
          <p class="fav-name">Nombre de Planta</p>
        </div>
      </div>
    </section>

    <section class="profile-section">
      <h2 class="section-title">Configuración</h2>
      <div class="settings-list">
        <div class="setting-item"><span>Nombre</span><span>UsuarioEjemplo</span></div>
        <div class="setting-item"><span>Email</span><span>usuario@ejemplo.com</span></div>
        <div class="setting-item"><span>Contraseña</span><span>••••••••</span></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:root {
  --primary: #eb1f81;
  --light-bg: #fdf0df;
  --dark-text: #0e1525;
  --gray: #555;
}

.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: var(--dark-text);
  font-size: 18px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--light-bg);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ccc;
}

.user-info {
  flex: 1;
}

.name {
  font-size: 20px;
  margin: 0;
}

.email {
  font-size: 18px;
  color: var(--gray);
  margin: 0.25rem 0;
}

.btn-edit {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-edit:hover {
  background: #cf1373;
}

.profile-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 20px;
  margin-bottom: 1rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.fav-card {
  background: var(--light-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.fav-image {
  width: 100%;
  height: 100px;
  background: #e7d5c3;
}

.fav-name {
  font-size: 18px;
  padding: 0.5rem;
  margin: 0;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  background: var(--light-bg);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  font-size: 18px;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .btn-edit {
    width: 100%;
    margin-top: 1rem;
  }
  .settings-list {
    gap: 0.5rem;
  }
}
</style>
