const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  nombre: String,
  anio: Number,
  imagen: String,
  correo: String,
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
