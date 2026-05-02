const express = require('express');
const { getStats } = require('../controllers/analytics.controllers');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router.get('/stats', getStats);

module.exports = router;
