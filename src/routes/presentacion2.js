const express = require('express');
const router = express.Router();

const presentacion2Controller = require('../controllers/presentacion2Controller');


router.get('/',presentacion2Controller.show);



module.exports = router;