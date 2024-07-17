const express = require('express');
const router = express.Router();

const prestamoController = require('../controllers/prestamoController');

router.get('/', prestamoController.list);

module.exports = router;
