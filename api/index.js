const app = require('../backend/src/app');
const connectDB = require('../backend/src/config/db');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB (Vercel will reuse this connection if the function stays warm)
let cachedDb = null;

module.exports = async (req, res) => {
  if (!cachedDb) {
    cachedDb = await connectDB();
  }
  return app(req, res);
};
