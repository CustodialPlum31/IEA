const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

//CRUD
router.get('/',customerController.list);//READ

router.post('/add', customerController.save);//CREATE

router.get('/delete/:id',customerController.delete);//DELETE

router.get('/update/:id',customerController.edit);
router.post('/update/:id',customerController.update);//UPDATE




module.exports = router;