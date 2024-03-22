const express = require('express');

const airQualityRoutes = require('./src/routes/airQualityRoutes');

const app = express();
const port = process.env.NODE_SERVER_PORT || 3000;

app.use(express.json());

app.use('/api/air-quality', airQualityRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});