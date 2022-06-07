//Rutas para sesion
const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController');

//api/sesion
router.post('/', sesionController.crearSesion);

module.exports = router;