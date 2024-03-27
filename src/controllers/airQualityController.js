const axios = require('axios');
const API_KEY = process.env.API_KEY;
const IQAIR_API_URL = process.env.IQAIR_API_URL;
const NEAREST_CITY_API = process.env.NEAREST_CITY_API;
const AirQuality = require('../models/airQualityModel');

module.exports = {
    getAirQuality: async (req, res) => {
        try {
            const { longitude, latitude } = req.params;
            console.log(longitude, latitude);
            const response = await axios.get(`${IQAIR_API_URL}${NEAREST_CITY_API}?lat=${latitude}&lon=${longitude}&key=${API_KEY}`);
            const { city, current: { pollution } } = response?.data?.data;
            await AirQuality.create({ city: city.toLowerCase(), pollution });
            res.json({ results: { pollution } });
        } catch (error) {
            console.error('Error fetching air quality:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getMostPolluted: async (req, res) => {
        try {
            const { city } = req.params;
            const criteria = { ...(city && { city: city.toLowerCase() }) };
            const mostPollutedData = await AirQuality.findOne(criteria, {}, { sort: { 'pollution.aqius': -1 } });
            res.json({ mostPollutedData });
        } catch (error) {
            console.error('Error fetching most polluted datetime:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
