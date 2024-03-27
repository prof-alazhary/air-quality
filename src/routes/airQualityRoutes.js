const express = require('express');
const router = express.Router();
const airQualityController = require('../controllers/airQualityController');

router.get('/air-quality/:latitude/:longitude', airQualityController.getAirQuality);
router.get('/most-polluted', airQualityController.getMostPolluted);
router.get('/most-polluted/:city', airQualityController.getMostPolluted);

module.exports = router;