require('dotenv').config();
const express = require('express');
const db = require('./src/config/db');

const airQualityRoutes = require('./src/routes/airQualityRoutes');

const app = express();
const port = process.env.NODE_SERVER_PORT || 3000;
const serverAddress = process.env.NODE_SERVER_ADDRESS || 'http://localhost';

app.use(express.json());

app.use('/api', airQualityRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${serverAddress}:${port}`);
});