const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
    ts: { type: Date, default: Date.now },
    aqius: Number,
    mainus: String,
    aqicn: Number,
    maincn: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AirQuality', airQualitySchema);