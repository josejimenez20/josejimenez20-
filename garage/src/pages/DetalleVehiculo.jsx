import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../css/DetalleVehiculo.css'

// Fix para los íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Coordenadas por municipio
const coordenadasPorMunicipio = {
  "Usulután": [13.3499, -88.4428],
  "Jiquilisco": [13.3167, -88.5833],
  "San Vicente": [13.6333, -88.7833],
  "La Unión": [13.3333, -87.8333],
  "San Miguel": [13.4833, -88.1833],
}

function DetalleVehiculo() {
  const { id } = useParams()
  const [vehiculo, setVehiculo] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/vehiculos/${id}`)
      .then(res => res.json())
      .then(data => setVehiculo(data))
      .catch(err => console.error('Error al obtener detalle:', err))
  }, [id])

  if (!vehiculo) return <p>Cargando vehículo...</p>

  const coords = coordenadasPorMunicipio[vehiculo.ubicacion] || [13.7, -89.2] // San Salvador si no coincide

  return (
    <div className="detalle-container">
      <h2>{vehiculo.modelo}</h2>
      {vehiculo.imagenes.map((img, index) => (
        <img key={index} src={img} alt={`img-${index}`} style={{ maxWidth: '100%', marginBottom: '10px' }} />
      ))}
      <p><strong>Año:</strong> {vehiculo.anio}</p>
      <p><strong>Precio:</strong> ${vehiculo.precio}</p>
      <p><strong>Descripción:</strong> {vehiculo.descripcion}</p>
      <p><strong>Ubicación:</strong> {vehiculo.ubicacion}</p>

      <div className="mapa">
        <MapContainer center={coords} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coords}>
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