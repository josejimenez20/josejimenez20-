import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/AgregarVehiculo.css'

function AgregarVehiculo() {
  const [vehiculo, setVehiculo] = useState({
    modelo: '',
    anio: '',
    precio: '',
    descripcion: '',
    imagenes: [], // ← ahora es array
    ubicacion: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setVehiculo({
      ...vehiculo,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    // Convertir cada imagen a base64
    const promesas = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    })

    Promise.all(promesas).then(imagenesBase64 => {
      setVehiculo(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, ...imagenesBase64]
      }))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const guardados = JSON.parse(localStorage.getItem('vehiculos')) || []
    guardados.push(vehiculo)
    localStorage.setItem('vehiculos', JSON.stringify(guardados))
    navigate('/vehiculos')
  }

  return (
    <div className="agregar-container">
      <h2>Subir un Vehículo</h2>
      <form onSubmit={handleSubmit} className="agregar-form">
        <input type="text" name="modelo" placeholder="Modelo" value={vehiculo.modelo} onChange={handleChange} required />
        <input type="number" name="anio" placeholder="Año" value={vehiculo.anio} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={vehiculo.precio} onChange={handleChange} required />
        <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
        <input type="text" name="ubicacion" placeholder="Ubicación" value={vehiculo.ubicacion} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={vehiculo.descripcion} onChange={handleChange} required />
        
        {/* Vista previa */}
        <div className="preview-imagenes">
          {vehiculo.imagenes.map((img, i) => (
            <img key={i} src={img} alt={`foto-${i}`} />
          ))}
        </div>

        <button type="submit">Publicar</button>
      </form>
    </div>
  )
}

export default AgregarVehiculo
