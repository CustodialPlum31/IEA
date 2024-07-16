const express = require('express');
const router = express.Router();

const presentacionController = require('../controllers/presentacionController');


router.get('/',presentacionController.show);



module.exports = router;