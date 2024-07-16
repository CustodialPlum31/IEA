const express = require('express');
const router = express.Router();

const solcomponenteController = require('../controllers/solcomponenteController');


router.get('/',solcomponenteController.list);
router.post('/pedir/:id_c/:cantidad', solcomponenteController.pedirPrestamo); // Ruta para solicitar préstamo usando URL




module.exports = router;