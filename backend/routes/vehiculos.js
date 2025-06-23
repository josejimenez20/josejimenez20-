const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { guardarVehiculo, obtenerVehiculos } = require('../controllers/vehiculosController');

// Configurar multer para guardar imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Ruta para guardar un nuevo vehículo (con imagen)
router.post('/', upload.single('imagen'), guardarVehiculo);

// Ruta para obtener los vehículos de un usuario por correo
router.get('/:correo', obtenerVehiculos);

module.exports = router;
