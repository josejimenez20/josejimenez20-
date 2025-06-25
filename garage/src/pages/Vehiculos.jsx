import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Vehiculos.css'

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/vehiculos')
      .then(res => res.json())
      .then(data => setVehiculos(data))
      .catch(err => console.error('Error al cargar vehículos:', err))
  }, [])

  return (
    <div className="vehiculos-container">
      <h2>Vehículos en Venta</h2>
      <div className="vehiculos-grid">
        {vehiculos.length === 0 ? (
          <p>No hay vehículos disponibles aún.</p>
        ) : (
          vehiculos.map((vehiculo) => (
            <Link to={`/vehiculos/${vehiculo._id}`} className="vehiculo-card" key={vehiculo._id}>
              <img src={vehiculo.imagenes?.[0]} alt={vehiculo.modelo} />
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