const express = require('express')
const router = express.Router()
const Vehiculo = require('../models/Vehiculo')

// Obtener todos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find()
    res.json(vehiculos)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener vehículos' })
  }
})

// Obtener por ID
router.get('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id)
    if (!vehiculo) return res.status(404).json({ error: 'No encontrado' })
    res.json(vehiculo)
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar vehículo' })
  }
})

// Guardar nuevo vehículo
router.post('/', async (req, res) => {
  try {
    const nuevo = new Vehiculo(req.body)
    await nuevo.save()
    res.status(201).json(nuevo)
  } catch (err) {
    console.error('Error al guardar vehículo:', err)
    res.status(500).json({ error: 'Error al guardar vehículo' })
  }
})

module.exports = router
