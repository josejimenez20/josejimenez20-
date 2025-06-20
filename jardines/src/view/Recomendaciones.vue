<template>
  <div class="recommendations">
    <div class="breadcrumb">Inicio &gt; Recomendaciones</div>
    <h1 class="title">Recomendaciones de Plantas</h1>
    <div class="cards-grid">
      <div class="plant-card">
        <div class="plant-image"></div>
        <div class="plant-details">
          <h3>Lavanda</h3>
          <p class="scientific">Lavandula angustifolia</p>
          <p class="description">Perfecta para climas templados y suelos bien drenados.</p>
        </div>
        <button class="fav-btn"><span class="heart">❤</span></button>
      </div>

      <div class="plant-card">
        <div class="plant-image"></div>
        <div class="plant-details">
          <h3>Rosa</h3>
          <p class="scientific">Rosa spp.</p>
          <p class="description">Ideal para dar color y aroma a tu jardín.</p>
        </div>
        <button class="fav-btn"><span class="heart">❤</span></button>
      </div>

      <div class="plant-card">
        <div class="plant-image"></div>
        <div class="plant-details">
          <h3>Orquídea</h3>
          <p class="scientific">Orchidaceae</p>
          <p class="description">Planta delicada, requiere luz indirecta y humedad.</p>
        </div>
        <button class="fav-btn"><span class="heart">❤</span></button>
      </div>

      <div class="plant-card">
        <div class="plant-image"></div>
        <div class="plant-details">
          <h3>Helecho</h3>
          <p class="scientific">Pteridophyta</p>
          <p class="description">Prefiere lugares sombreados y suelo húmedo.</p>
        </div>
        <button class="fav-btn"><span class="heart">❤</span></button>
      </div>

      <div class="plant-card">
        <div class="plant-image"></div>
        <div class="plant-details">
          <h3>Cactus</h3>
          <p class="scientific">Cactaceae</p>
          <p class="description">Resistente a la sequía, perfecto para espacios soleados.</p>
        </div>
        <button class="fav-btn"><span class="heart">❤</span></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary: #eb1f81;
  --light-bg: #fdf0df;
  --dark-text: #0e1525;
  --gray: #555;
}

.recommendations {
  font-family: Arial, sans-serif;
  font-size: 18px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--dark-text);
}

.breadcrumb {
  font-size: 18px;
  color: var(--gray);
  margin-bottom: 1rem;
}

.title {
  font-size: 20px;
  margin-bottom: 1.5rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.plant-card {
  background: var(--light-bg);
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}
.plant-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.plant-image {
  width: 100%;
  height: 150px;
  background: #e7d5c3;
  background-size: cover;
  background-position: center;
}

.plant-details {
  padding: 1rem;
}
.plant-details h3 {
  font-size: 20px;
  margin: 0 0 0.5rem;
}

.scientific {
  font-size: 18px;
  font-style: italic;
  color: var(--gray);
  margin-bottom: 0.75rem;
}

.description {
  font-size: 18px;
  line-height: 1.4;
  color: var(--dark-text);
}

.fav-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}
.fav-btn:hover {
  background: var(--primary);
}
.fav-btn .heart {
  color: #aaa;
  font-size: 1rem;
}
.fav-btn:hover .heart {
  color: #fff;
}

@media (max-width: 768px) {
  .title {
    font-size: 18px;
  }
  .plant-image {
    height: 120px;
  }
}

</style>
