import { Link } from 'react-router-dom'
import '../css/NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Drift Shop</h1>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/vehiculos">Ver Vehículos</Link>
        <Link to="/agregar">Subir Vehículo</Link>
      </div>
    </nav>
  )
}

export default NavBar
