const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
  let { nombre, correo, contrasena } = req.body;

  try {
    // Normalizar
    correo = correo.toLowerCase().trim();
    nombre = nombre.trim();

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = new Usuario({ nombre, correo, contrasena: hash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const loginUsuario = async (req, res) => {
  let { correo, contrasena } = req.body;

  try {
    // Normalizar
    correo = correo.toLowerCase().trim();

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, 'secreto123', {
      expiresIn: '2h'
    });

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

module.exports = { registrarUsuario, loginUsuario };
