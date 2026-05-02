const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    default: () => `CF-${Math.floor(1000 + Math.random() * 9000)}`
  },
  customer: {
    type: String,
    required: [true, 'Please add a customer name']
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination']
  },
  origin: {
    type: String,
    default: 'Warehouse A'
  },
  cargoType: {
    type: String,
    default: 'Standard Cargo'
  },
  weight: {
    type: Number,
    default: 1000
  },
  pickupDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  vehicle: {
    type: String,
    default: 'Not Assigned'
  },
  eta: {
    type: String,
    default: 'TBD'
  },
  cost: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
