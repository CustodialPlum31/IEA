const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Ruta para listar préstamos activos (solo para administradores)
router.get('/', estadoController.list);
router.get('/delete/:id_p',estadoController.delete);

module.exports = router;
