const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')

// Registro
router.post('/registro', async (req, res) => {
  const { nombre, correo, password, ubicacion } = req.body
  try {
    const nuevoUsuario = new Usuario({ nombre, correo, password, ubicacion })
    await nuevoUsuario.save()
    res.status(200).json({ message: 'Usuario registrado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body
  try {
    const usuario = await Usuario.findOne({ correo, password })
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})

module.exports = router
