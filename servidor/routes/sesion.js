//Rutas para sesion
const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController');

//api/sesiones
router.post('/', sesionController.crearSesion);
router.get('/',sesionController.obtenerSesiones);
//router.put('/:id',sesionController.actualizarSesion);
router.get('/:id',sesionController.obtenerSesion);
router.delete('/:id',sesionController.eliminarSesion);

module.exports = router;