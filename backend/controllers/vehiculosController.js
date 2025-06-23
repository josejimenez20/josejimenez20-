const Vehiculo = require('../models/Vehiculo');

const guardarVehiculo = async (req, res) => {
  try {
    const { nombre, anio, correo } = req.body;
    const imagen = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

    const nuevo = new Vehiculo({ nombre, anio, imagen, correo });
    await nuevo.save();

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar', error });
  }
};

const obtenerVehiculos = async (req, res) => {
  try {
    const correo = req.params.correo;
    const vehiculos = await Vehiculo.find({ correo });
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener vehículos', error });
  }
};

module.exports = { guardarVehiculo, obtenerVehiculos };
