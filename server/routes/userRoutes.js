const express = require('express')
const authController = require('../controllers/userController');
const router = express.Router()

router.post('/signup',authController.createUser);
router.post('/signin', authController.signinUser);


module.exports = router;
