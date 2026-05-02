const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`DATABASE WARNING: ${err.message}. Running in Demo Mode.`);
    // Do not exit process
  }
};

module.exports = connectDB;
