const express = require('express');
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/booking.controllers');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router
  .route('/')
  .get(getBookings)
  .post(createBooking);

router
  .route('/:id')
  .put(updateBooking)
  .delete(deleteBooking);

module.exports = router;
