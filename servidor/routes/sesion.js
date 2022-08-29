//Rutas para sesion
const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController');

//api/sesiones
router.post('/', sesionController.crearSesion);
router.get('/',sesionController.obtenerSesiones);
router.put('/:id',sesionController.actualizarSesion);

router.put('/:id',sesionController.actualizarEmociones);
router.put('/:id',sesionController.actualizarQuejidos);
router.put('/:id',sesionController.actualizarPulsaciones);

router.get('/:id',sesionController.obtenerSesion);
router.delete('/:id',sesionController.eliminarSesion);

module.exports = router;