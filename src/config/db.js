const mongoose = require('mongoose');
const DB_NAME = 'air_quality_db';
const DB_REMOTE_ADDRESS = 'mongodb://localhost/';
const mongoURI = process.env.MONGODB_URI || (DB_REMOTE_ADDRESS + DB_NAME);

mongoose.connect(mongoURI);

module.exports = mongoose;