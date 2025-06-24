import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Vehiculos from './pages/Vehiculos'
import DetalleVehiculo from './pages/DetalleVehiculo'
import AgregarVehiculo from './pages/AgregarVehiculo'
import './css/index.css'
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> {/* Diseño común si se quiere */}
          <Route path="home" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="vehiculos" element={<Vehiculos />} />
          <Route path="vehiculos/:id" element={<DetalleVehiculo />} />
          <Route path="agregar" element={<AgregarVehiculo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
