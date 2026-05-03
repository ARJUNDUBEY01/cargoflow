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

// Health check
app.get('/health', (req, res) => res.json({ status: 'Backend is Healthy' }));

// Unified Router to handle both /api and no-prefix (Vercel)
const router = express.Router();
router.use('/auth', auth);
router.use('/bookings', bookings);
router.use('/fleet', fleet);
router.use('/alerts', alerts);
router.use('/analytics', analytics);

// Mount routers
app.use('/api', router);
app.use('/', router);

module.exports = app;
