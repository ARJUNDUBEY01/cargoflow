const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route files
const bookings = require('./src/routes/bookings');
const fleet = require('./src/routes/fleet');
const alerts = require('./src/routes/alerts');
const analytics = require('./src/routes/analytics');

// Mount routers
app.use('/api/bookings', bookings);
app.use('/api/fleet', fleet);
app.use('/api/alerts', alerts);
app.use('/api/analytics', analytics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
