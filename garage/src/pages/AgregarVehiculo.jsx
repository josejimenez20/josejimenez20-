import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/AgregarVehiculo.css'

const departamentos = [
  "Ahuachapán","Cabañas","Chalatenango","Cuscatlán","La Libertad",
  "La Paz","La Unión","Morazán","San Miguel","San Salvador",
  "San Vicente","Santa Ana","Sonsonate","Usulután"
]

const zonasPorDepto = {
  "Usulután": ["Usulután Este","Usulután Norte","Usulután Oeste"],
  "La Unión": ["La Unión Norte","La Unión Sur"],
  "San Miguel": ["San Miguel Centro","San Miguel Norte","San Miguel Oeste"],
  "San Salvador": ["San Salvador Centro","San Salvador Norte","San Salvador Este","San Salvador Oeste","San Salvador Sur"],
  "Santa Ana": ["Santa Ana Centro","Santa Ana Norte","Santa Ana Este","Santa Ana Oeste"],
  "Sonsonate": ["Sonsonate Centro","Sonsonate Norte","Sonsonate Este","Sonsonate Oeste"],
  "La Libertad": ["La Libertad Centro","La Libertad Norte","La Libertad Este","La Libertad Oeste","La Libertad Costa","La Libertad Sur"],
  "Chalatenango": ["Chalatenango Norte","Chalatenango Centro","Chalatenango Sur"],
  "La Paz": ["La Paz Oeste","La Paz Centro","La Paz Este"],
  "Cabañas": ["Cabañas Oeste","Cabañas Este"],
  "Cuscatlán": ["Cuscatlán Norte","Cuscatlán Sur"],
  "Ahuachapán": ["Ahuachapán Norte","Ahuachapán Centro","Ahuachapán Sur"],
  "Morazán": ["Morazán Norte","Morazán Sur"],
  "San Vicente": ["San Vicente Norte","San Vicente Sur"]
}

const municipiosPorZona = {
  "Usulután Este": ["California","Concepción Batres","Ereguayquín","Jucuarán","Ozatlán","Santa Elena","Santa María","Tecapán","Usulután"],
  "Usulután Norte": ["Alegría","Berlín","El Triunfo","Estanzuelas","Jucuapa","Mercedes Umaña","Nueva Granada","San Buenaventura","Santiago de María"],
  "Usulután Oeste": ["Jiquilisco","Puerto El Triunfo","San Agustín","San Francisco Javier"],
  "La Unión Norte": ["Anamorós","Bolívar","Concepción de Oriente","El Sauce","Lislique","Nueva Esparta","Pasaquina","Polorós","San José La Fuente","Santa Rosa de Lima"],
  "La Unión Sur": ["Conchagua","El Carmen","Intipucá","La Unión","Meanguera del Golfo","San Alejo","Yayantique","Yucuaiquín"],
  "San Miguel Centro": ["Chirilagua","Comacarán","Moncagua","Quelepa","San Miguel","Uluazapa"],
  "San Miguel Norte": ["Carolina","Chapeltique","Ciudad Barrios","Nuevo Edén de San Juan","San Gerardo","San Luis de La Reina","Sesori","San Antonio"],
  "San Miguel Oeste": ["Chinameca","El Tránsito","Lolotique","Nueva Guadalupe","San Jorge","San Rafael Oriente"],
  // ... Agregar municipios para los demás departamentos según el patrón
}

function AgregarVehiculo() {
  const [vehiculo, setVehiculo] = useState({
    modelo: '',
    anio: '',
    precio: '',
    descripcion: '',
    imagenes: [],
    departamento: '',
    zona: '',
    ubicacion: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setVehiculo(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'departamento' ? { zona: '', ubicacion: '' } : {}),
      ...(name === 'zona' ? { ubicacion: '' } : {})
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    Promise.all(files.map(file => new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onloadend = () => res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    }))).then(imgs => setVehiculo(prev => ({
      ...prev,
      imagenes: [...prev.imagenes, ...imgs]
    })))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/vehiculos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehiculo)
      })
      if (res.ok) navigate('/vehiculos')
      else alert('Error al guardar vehículo.')
    } catch (err) {
      console.error('Error al conectar con backend:', err)
    }
  }

  return (
    <div className="agregar-container">
      <h2>Subir un Vehículo</h2>
      <form onSubmit={handleSubmit} className="agregar-form">
        <input type="text" name="modelo" placeholder="Modelo" value={vehiculo.modelo} onChange={handleChange} required />
        <input type="number" name="anio" placeholder="Año" value={vehiculo.anio} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={vehiculo.precio} onChange={handleChange} required />
        <input type="file" accept="image/*" multiple onChange={handleFileChange} required />

        <select name="departamento" value={vehiculo.departamento} onChange={handleChange} required>
          <option value="">Seleccione departamento</option>
          {departamentos.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>

        <select name="zona" value={vehiculo.zona} onChange={handleChange} required disabled={!vehiculo.departamento}>
          <option value="">Seleccione zona</option>
          {(zonasPorDepto[vehiculo.departamento] || []).map(z => <option key={z} value={z}>{z}</option>)}
        </select>

        <select name="ubicacion" value={vehiculo.ubicacion} onChange={handleChange} required disabled={!vehiculo.zona}>
          <option value="">Seleccione municipio</option>
          {(municipiosPorZona[vehiculo.zona] || []).map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <textarea name="descripcion" placeholder="Descripción" value={vehiculo.descripcion} onChange={handleChange} required />

        <div className="preview-imagenes">
          {vehiculo.imagenes.map((img, i) => <img key={i} src={img} alt={`foto-${i}`} />)}
        </div>

        <button type="submit">Publicar</button>
      </form>
    </div>
  )
}

export default AgregarVehiculo
