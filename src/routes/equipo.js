const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipoController');


router.get('/',equipoController.list);
router.post('/add', equipoController.save);

router.get('/delete/:id_e',equipoController.delete);

router.get('/update/:id_e',equipoController.edit);
router.post('/update/:id_e',equipoController.update);




module.exports = router;