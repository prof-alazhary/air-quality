const axios = require('axios');
const API_KEY = process.env.API_KEY;
const IQAIR_API_URL = process.env.IQAIR_API_URL;
const NEAREST_CITY_API = process.env.NEAREST_CITY_API;

module.exports = {
    getAirQuality: async (req, res) => {
        try {
            const { longitude, latitude } = req.params;
            console.log(longitude, latitude)
            const response = await axios.get(`${IQAIR_API_URL}${NEAREST_CITY_API}?lat=${latitude}&lon=${longitude}&key=${API_KEY}`);
            const airQualityInfo = response.data?.data?.current;
            res.json({ results: airQualityInfo });
        } catch (error) {
            console.error('Error fetching air quality:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}