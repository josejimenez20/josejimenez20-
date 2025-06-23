const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  año: { type: Number, required: true },
  color: { type: String, required: true },
  placa: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Auto', AutoSchema);
