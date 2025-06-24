import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Vehiculos.css'

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([])

  useEffect(() => {
    const dataGuardada = localStorage.getItem('vehiculos')
    if (dataGuardada) {
      setVehiculos(JSON.parse(dataGuardada))
    }
  }, [])

  return (
    <div className="vehiculos-container">
      <h2>🚘 Vehículos en Venta</h2>
      <div className="vehiculos-grid">
        {vehiculos.length === 0 ? (
          <p>No hay vehículos disponibles aún.</p>
        ) : (
          vehiculos.map((vehiculo, index) => (
            <Link to={`/vehiculos/${index}`} className="vehiculo-card" key={index}>
              <img src={vehiculo.imagen} alt={vehiculo.modelo} />
              <h3>{vehiculo.modelo}</h3>
              <p><strong>Año:</strong> {vehiculo.anio}</p>
              <p><strong>Precio:</strong> ${vehiculo.precio}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Vehiculos