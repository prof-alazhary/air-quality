const axios = require('axios');
const API_KEY = '6b441523-dd55-4aad-91b9-9e4594a5dc9a';

module.exports = {
    getAirQuality: async (req, res) => {
        try {
            const { longitude, latitude } = req.params;
            console.log(longitude, latitude)

            const response = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`);
            const airQualityInfo = response.data?.data?.current;
            res.json({ results: airQualityInfo });
        } catch (error) {
            console.error('Error fetching air quality:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}