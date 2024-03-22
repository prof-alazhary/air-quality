exports.getAirQuality = async (req, res) => {
    const { longitude, latitude } = req.params;
    console.log(longitude, latitude);
    try {
        res.json({ results: "air quality info..." });
    } catch (error) {
        console.error('Error fetching air quality:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};