const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Fleet = require('./models/Fleet');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Find John Doe
    const user = await User.findOne({ email: 'john.doe@example.com' });

    if (!user) {
      console.log('User john.doe@example.com not found. Please register first.');
      process.exit(1);
    }

    // Clear existing bookings and fleet for this user
    await Booking.deleteMany({ user: user._id });
    await Fleet.deleteMany({ user: user._id });

    const bookings = [
      {
        customer: 'Global Tech Solutions',
        destination: 'San Francisco, USA',
        status: 'In Transit',
        vehicle: 'TRK-9021',
        cost: 4500,
        user: user._id
      },
      {
        customer: 'Retail Giant Corp',
        destination: 'London, UK',
        status: 'Pending',
        cost: 2100,
        user: user._id
      },
      {
        customer: 'Eco Green Logistics',
        destination: 'Berlin, Germany',
        status: 'Delivered',
        vehicle: 'EV-4422',
        cost: 3800,
        user: user._id
      }
    ];

    await Booking.insertMany(bookings);

    const vehicles = [
      {
        vehicleId: 'VH-9021',
        type: 'Heavy Truck',
        status: 'In Transit',
        location: 'Mumbai, IN',
        load: 85,
        user: user._id
      },
      {
        vehicleId: 'VH-9022',
        type: 'Container',
        status: 'Maintenance',
        location: 'Delhi, IN',
        load: 0,
        user: user._id
      },
      {
        vehicleId: 'VH-9023',
        type: 'Mini Van',
        status: 'Available',
        location: 'Pune, IN',
        load: 0,
        user: user._id
      },
      {
        vehicleId: 'VH-9024',
        type: 'Flatbed',
        status: 'In Transit',
        location: 'Bangalore, IN',
        load: 92,
        user: user._id
      }
    ];

    await Fleet.insertMany(vehicles);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
