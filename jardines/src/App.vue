<template>
  <nav class="navbar">
    <div class="navbar-brand">FlorForma</div>
  </nav>
  <router-view />
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background-color: #fdf0df;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
  margin-bottom: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  color: #6e3b28;
}

.navbar-brand {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  color: #a35b36;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  background-color: #e7d5c3;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  color: #6e3b28;
}

.active-link {
  background-color: #e7beb8;
  color: #6e3b28;
  border: 1px solid #c9945b;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .navbar {
    padding: 1rem 2rem;
  }
  .navbar-brand {
    font-size: 1.75rem;
  }
  .navbar-links {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
  .navbar-brand {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
  }
  .navbar-links {
    flex-wrap: wrap;
    gap: 0.75rem;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .navbar {
    align-items: center;
    text-align: center;
  }
  .navbar-brand {
    width: 100%;
  }
  .navbar-links {
    flex-direction: column;
    gap: 0.5rem;
  }
  .nav-link {
    width: 100%;
    padding: 0.75rem;
  }
}
</style>
