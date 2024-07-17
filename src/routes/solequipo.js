const express = require('express');
const router = express.Router();
const solequipoController = require('../controllers/solequipoController');

router.get('/', solequipoController.list);
router.get('/solicitar', solequipoController.solicitarPrestamo);

module.exports = router;
