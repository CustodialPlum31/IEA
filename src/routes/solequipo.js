const express = require('express');
const router = express.Router();

const solequipoController = require('../controllers/solequipoController');


router.get('/',solequipoController.list);
/*router.post('/add', componenteController.save);

router.get('/delete/:id_c',componenteController.delete);

router.get('/update/:id_c',componenteController.edit);
router.post('/update/:id_c',componenteController.update);
*/



module.exports = router;