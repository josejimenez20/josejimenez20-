import { useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../css/DetalleVehiculo.css'

function DetalleVehiculo() {
  const { id } = useParams()
  const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || []
  const vehiculo = vehiculos[id]

  if (!vehiculo) return <p>Vehículo no encontrado</p>

  return (
    <div className="detalle-container">
      <h2>{vehiculo.modelo}</h2>
      <img src={vehiculo.imagen} alt={vehiculo.modelo} />
      <p><strong>Año:</strong> {vehiculo.anio}</p>
      <p><strong>Precio:</strong> ${vehiculo.precio}</p>
      <p><strong>Descripción:</strong> {vehiculo.descripcion}</p>
      <p><strong>Ubicación:</strong> {vehiculo.ubicacion}</p>

      {/* Mapa simulado */}
      <div className="mapa">
        <MapContainer center={[13.7, -89.2]} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[13.7, -89.2]}>
            <Popup>
              {vehiculo.modelo} en {vehiculo.ubicacion}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default DetalleVehiculo

