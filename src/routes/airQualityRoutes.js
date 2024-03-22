const express = require('express');
const router = express.Router();
const airQualityController = require('../controllers/airQualityController');

router.get('/:latitude/:longitude', airQualityController.getAirQuality);

module.exports = router;