const mongoose = require('mongoose')

const VehiculoSchema = new mongoose.Schema({
  modelo: String,
  anio: Number,
  precio: Number,
  descripcion: String,
  imagenes: [String], // base64
  ubicacion: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Vehiculo', VehiculoSchema)
