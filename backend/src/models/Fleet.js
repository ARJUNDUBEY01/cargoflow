const mongoose = require('mongoose');

const FleetSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: [true, 'Please add a vehicle type'],
    enum: ['Heavy Truck', 'Container', 'Mini Van', 'Flatbed', 'Refrigerated Truck']
  },
  status: {
    type: String,
    enum: ['Available', 'In Transit', 'Maintenance', 'Out of Service'],
    default: 'Available'
  },
  location: {
    type: String,
    required: [true, 'Please add current location']
  },
  load: {
    type: Number,
    min: 0,
    max: 100,
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

module.exports = mongoose.model('Fleet', FleetSchema);
