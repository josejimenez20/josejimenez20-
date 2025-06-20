<template>
  <div class="home">
    <section class="hero-home">
      <h1 class="hero-title">Bienvenido a FlorForma</h1>
      <p class="hero-subtitle">Planifica y crea tu espacio verde de manera fácil.</p>
      <div class="hero-actions">
        <button class="btn-primary" @click="irAComenzar">Comenzar</button>
        <router-link to="/contacto" class="btn-outline">Contáctanos</router-link>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <h2>Planificación Intuitiva</h2>
        <p>Herramientas sencillas para diseñar tu jardín paso a paso.</p>
      </div>
      <div class="feature-card">
        <h2>Recomendaciones Inteligentes</h2>
        <p>Sugerencias de plantas según tu clima y espacio disponible.</p>
      </div>
      <div class="feature-card">
        <h2>Compartir Proyectos</h2>
        <p>Comparte tus ideas con amigos y expertos al instante.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Simulación de sesión (reemplazar por lógica real)
const userLoggedIn = ref(false)

const router = useRouter()
const irAComenzar = () => {
  if (userLoggedIn.value) {
    router.push('/comenzar')
  } else {
    router.push('/login')
  }
}
</script>

<style scoped>
.home {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #333;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-home {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #0e1525;
  color: #ffffff;
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-actions .btn-primary,
.hero-actions .btn-outline {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #eb1f81 0%, #cf1373 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(235, 31, 129, 0.4);
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(235, 31, 129, 0.6);
}

.btn-outline {
  border: 2px solid #ffffff;
  color: #ffffff;
  background: transparent;
}
.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.feature-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #0e1525;
}

.feature-card p {
  font-size: 1rem;
  color: #555;
}

@media (max-width: 1024px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 2.25rem;
  }
  .hero-subtitle {
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }
  .hero-subtitle {
    font-size: 0.9rem;
  }
  .hero-actions .btn-primary,
  .hero-actions .btn-outline {
    width: 100%;
    text-align: center;
  }
}
</style>
