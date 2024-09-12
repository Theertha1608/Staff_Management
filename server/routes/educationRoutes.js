const express = require('express')
const educationController = require('../controllers/educationController');
const router = express.Router()

router.post('/EducationDetails',educationController.postEducationDeatils);
router.post('/post-experience-detials',educationController.postEducationDeatils);


module.exports = router;
