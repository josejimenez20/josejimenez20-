const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión:', err));

// Rutas
app.use('/api/autos', require('./routes/autos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/vehiculos', require('./routes/vehiculos'));
app.use('/uploads', express.static('uploads'));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
