const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Ruta para listar préstamos activos (solo para administradores)
router.get('/', estadoController.list);

module.exports = router;
