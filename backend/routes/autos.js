const express = require('express');
const router = express.Router();
const Auto = require('../models/Auto');

// Obtener todos los autos
router.get('/', async (req, res) => {
  try {
    const autos = await Auto.find();
    res.json(autos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los autos' });
  }
});

// Crear un auto nuevo
router.post('/', async (req, res) => {
  try {
    const nuevoAuto = new Auto(req.body);
    await nuevoAuto.save();
    res.status(201).json(nuevoAuto);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar el auto' });
  }
});

module.exports = router;
