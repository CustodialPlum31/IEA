const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

//CRUD
router.get('/',loginController.list);//READ


module.exports = router;