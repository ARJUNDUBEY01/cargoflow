const Booking = require('../models/Booking');
const Fleet = require('../models/Fleet');

// @desc    Get dashboard stats
// @route   GET /api/analytics/stats
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments({ user: req.user.id });
    const activeBookings = await Booking.countDocuments({ 
      user: req.user.id, 
      status: { $in: ['In Transit', 'Pending'] } 
    });

    const fleetTotal = await Fleet.countDocuments({ user: req.user.id });
    const fleetInTransit = await Fleet.countDocuments({ 
      user: req.user.id, 
      status: 'In Transit' 
    });

    // Calculate total revenue
    const bookings = await Booking.find({ user: req.user.id });
    const totalRevenue = bookings.reduce((acc, booking) => acc + (booking.cost || 0), 0);

    // Mock alerts
    const alertsCount = 3; 

    res.status(200).json({
      success: true,
      data: {
        activeBookings,
        fleetInTransit,
        alertsCount,
        totalRevenue,
        totalBookings,
        fleetTotal
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
