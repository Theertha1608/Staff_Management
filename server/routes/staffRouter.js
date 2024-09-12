const express = require('express');
const staffController = require('../controllers/staffController');
const router = express.Router();

router.post('/addStaffDetails', staffController.addStaffDetails);

module.exports = router;
