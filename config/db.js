const mongoose = require('mongoose');
const user = require('../models/user');

const MONGO_URI = process.env.MONGO_URI || "your-mongodb-connection-string";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Running without database connection');
  }
};

module.exports = connectDB;