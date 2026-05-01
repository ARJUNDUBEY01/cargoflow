const express = require('express');
const cors = require('cors');

// Route files
const auth = require('./routes/auth.routes');
const bookings = require('./routes/booking.routes');
const fleet = require('./routes/fleet.routes');
const alerts = require('./routes/alert.routes');
const analytics = require('./routes/analytics.routes');

const app = express();

app.use(express.json());
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/bookings', bookings);
app.use('/api/fleet', fleet);
app.use('/api/alerts', alerts);
app.use('/api/analytics', analytics);

module.exports = app;
