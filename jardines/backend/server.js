// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const usuariosRoutes = require('./routes/usuarios')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/jardin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error(' Error de conexión a MongoDB:', err))

app.use('/api/usuarios', usuariosRoutes)

app.listen(3000, () => {
  console.log('🚀 Servidor backend corriendo en http://localhost:3000')
})
