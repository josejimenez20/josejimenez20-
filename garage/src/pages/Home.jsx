import { Link } from 'react-router-dom'
import '../css/Home.css'

function Home() {
  return (
    <div className="home-wrapper">
      <header className="hero-section">
        <div className="hero-text">
          <h1>Bienvenido a Drift Shop</h1>
          <p>Compra y vende vehículos de forma fácil, rápida y segura.</p>
          <Link to="/vehiculos" className="btn-ver">Ver Vehículos</Link>
        </div>
      </header>

      <section className="carousel-section">
        <h2>Vehículos Populares</h2>
        <div className="carousel-wrapper">
          <div className="carousel-track">
            <img src="https://hips.hearstapps.com/hmg-prod/images/2024-nissan-sentra-129-6488757e6ae9a.jpg?" alt="Carro 1" />
            <img src="https://cdn.motor1.com/images/mgl/g4zEQN/s3/pajero-sport-2025_legend-3.jpg" alt="Carro 2" />
            <img src="https://img.asmedia.epimg.net/resizer/v2/EDIQD3KHXJBAPMTQVIVAYBFPOI.jpg?auth=e6ef1381d473c2a343219eb729eaafa14784e1eda2ea02d4855d8875440aab51&width=1200&height=675&smart=true" alt="Carro 3" />
          </div>
        </div>
      </section>
      <section className="info-section">
        <h2>¿Quiénes somos?</h2>
        <p>
          Drift Shop es una plataforma dedicada a conectar compradores y vendedores de vehículos. Nuestro objetivo es brindarte una experiencia confiable, visual y segura.
        </p>
      </section>

      <section className="contacto-section">
        <h2>Contacto</h2>
        <p><strong>Email:</strong> jimenez@driftshop.com</p>
        <p><strong>Teléfono:</strong> +503 7890 1234</p>
        <p><strong>Dirección:</strong> Usulutan, El Salvador</p>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Drift Shop. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Home
