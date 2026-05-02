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
const auth = require('./src/routes/auth.routes');
const bookings = require('./src/routes/booking.routes');
const fleet = require('./src/routes/fleet.routes');
const alerts = require('./src/routes/alert.routes');
const analytics = require('./src/routes/analytics.routes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/bookings', bookings);
app.use('/api/fleet', fleet);
app.use('/api/alerts', alerts);
app.use('/api/analytics', analytics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
