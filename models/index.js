// Require the Mongoose package & your environment configuration
const mongoose = require('mongoose');
require('dotenv').config()

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection
	
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

db.on('error', function (err) {
  console.error('MongoDB connection error:', err);
});

// Export models to `server.js`
module.exports = {
    User: require('./user'),
    Task: require('./task'),
  };