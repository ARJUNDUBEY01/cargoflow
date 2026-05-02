import React, { createContext, useContext, useState } from 'react';

const AppDataContext = createContext();

const INITIAL_SHIPMENTS = [
  { id: '#CF-2841', company: 'Global Tech Solutions',  dest: 'Mumbai, India',    vehicle: 'MH-04-EX-2034', status: 'In Transit', eta: '2.4 hrs' },
  { id: '#CF-2842', company: 'Retail Giant Corp',       dest: 'Delhi, India',     vehicle: 'DL-07-CX-1122', status: 'In Transit', eta: '3.1 hrs' },
  { id: '#CF-2843', company: 'Eco Green Logistics',     dest: 'Pune, India',      vehicle: 'MH-12-PQ-4455', status: 'In Transit', eta: '1.8 hrs' },
  { id: '#CF-2844', company: 'Sunrise Exports',         dest: 'Chennai, India',   vehicle: 'TN-09-AB-7890', status: 'In Transit', eta: '5.2 hrs' },
  { id: '#CF-2845', company: 'NextGen Freight',         dest: 'Bangalore, India', vehicle: 'KA-01-MN-3344', status: 'In Transit', eta: '4.0 hrs' },
  { id: '#CF-2846', company: 'BlueWave Traders',        dest: 'Hyderabad, India', vehicle: 'TS-08-GH-6677', status: 'In Transit', eta: '6.5 hrs' },
  { id: '#CF-2847', company: 'SkyRocket Cargo',         dest: 'Kolkata, India',   vehicle: 'WB-02-RS-9988', status: 'In Transit', eta: '8.3 hrs' },
  { id: '#CF-2848', company: 'OceanPort Logistics',     dest: 'Ahmedabad, India', vehicle: 'GJ-05-UV-2211', status: 'In Transit', eta: '3.7 hrs' },
  { id: '#CF-2849', company: 'Metro Supplies',          dest: 'Jaipur, India',    vehicle: 'Not Assigned',  status: 'Pending',    eta: 'TBD' },
  { id: '#CF-2850', company: 'Horizon Freight',         dest: 'Surat, India',     vehicle: 'Not Assigned',  status: 'Pending',    eta: 'TBD' },
  { id: '#CF-2851', company: 'Apex Logistics',          dest: 'Lucknow, India',   vehicle: 'Not Assigned',  status: 'Pending',    eta: 'TBD' },
  { id: '#CF-2852', company: 'Delta Cargo',             dest: 'Nagpur, India',    vehicle: 'Not Assigned',  status: 'Pending',    eta: 'TBD' },
  { id: '#CF-2820', company: 'Sterling Exports',        dest: 'Mumbai, India',    vehicle: 'MH-01-XX-1234', status: 'Delivered',  eta: 'Done' },
  { id: '#CF-2821', company: 'TrueNorth Cargo',         dest: 'Delhi, India',     vehicle: 'DL-02-YY-5678', status: 'Delivered',  eta: 'Done' },
  { id: '#CF-2822', company: 'Orbit Logistics',         dest: 'Bangalore, India', vehicle: 'KA-03-ZZ-9012', status: 'Delivered',  eta: 'Done' },
  { id: '#CF-2823', company: 'Titan Freight',           dest: 'Chennai, India',   vehicle: 'TN-04-AA-3456', status: 'Delivered',  eta: 'Done' },
  { id: '#CF-2824', company: 'Nova Cargo',              dest: 'Pune, India',      vehicle: 'MH-05-BB-7890', status: 'Delivered',  eta: 'Done' },
];

const INITIAL_BOOKINGS = [
  { id: '#BK-5501', customer: 'Global Tech Solutions', origin: 'Mumbai',    dest: 'Delhi',     cargo: 'Electronics',   weight: '1,200 kg', status: 'In Transit', date: 'May 3, 2026' },
  { id: '#BK-5502', customer: 'Retail Giant Corp',     origin: 'Chennai',   dest: 'Bangalore', cargo: 'Apparel',       weight: '850 kg',   status: 'Pending',    date: 'May 4, 2026' },
  { id: '#BK-5503', customer: 'Eco Green Logistics',   origin: 'Pune',      dest: 'Hyderabad', cargo: 'Organic Goods', weight: '640 kg',   status: 'In Transit', date: 'May 4, 2026' },
  { id: '#BK-5504', customer: 'Sunrise Exports',       origin: 'Ahmedabad', dest: 'Kolkata',   cargo: 'Textiles',      weight: '2,100 kg', status: 'In Transit', date: 'May 2, 2026' },
  { id: '#BK-5505', customer: 'NextGen Freight',       origin: 'Delhi',     dest: 'Jaipur',    cargo: 'Auto Parts',    weight: '980 kg',   status: 'Delivered',  date: 'May 1, 2026' },
  { id: '#BK-5506', customer: 'BlueWave Traders',      origin: 'Surat',     dest: 'Mumbai',    cargo: 'Chemicals',     weight: '1,750 kg', status: 'In Transit', date: 'May 5, 2026' },
  { id: '#BK-5507', customer: 'SkyRocket Cargo',       origin: 'Kolkata',   dest: 'Chennai',   cargo: 'Machinery',     weight: '3,400 kg', status: 'Pending',    date: 'May 5, 2026' },
  { id: '#BK-5508', customer: 'OceanPort Logistics',   origin: 'Bangalore', dest: 'Pune',      cargo: 'Perishables',   weight: '520 kg',   status: 'In Transit', date: 'May 2, 2026' },
  { id: '#BK-5509', customer: 'Metro Supplies',        origin: 'Jaipur',    dest: 'Delhi',     cargo: 'Electronics',   weight: '700 kg',   status: 'Pending',    date: 'May 6, 2026' },
  { id: '#BK-5510', customer: 'Horizon Freight',       origin: 'Surat',     dest: 'Hyderabad', cargo: 'Apparel',       weight: '1,100 kg', status: 'Pending',    date: 'May 6, 2026' },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'alert',   title: 'TRK-9021 Overdue',        desc: 'Checkpoint missed — 2 hrs late',      time: '10:42 AM', read: false },
  { id: 2, type: 'warning', title: 'CF-1048 Unassigned',       desc: 'No vehicle assigned to shipment',     time: '09:15 AM', read: false },
  { id: 3, type: 'success', title: 'EV-4422 Delivered',        desc: 'Berlin delivery confirmed',           time: '08:30 AM', read: true  },
  { id: 4, type: 'info',    title: 'New booking received',     desc: 'BlueWave Traders — Surat → Mumbai',  time: 'Yesterday', read: true  },
  { id: 5, type: 'warning', title: 'Low fuel: KA-01-MN-3344',  desc: 'Vehicle fuel below 20%',              time: 'Yesterday', read: true  },
];

export function AppDataProvider({ children }) {
  const [shipments, setShipments] = useState(INITIAL_SHIPMENTS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const addShipment = (data) => {
    const newId = `#CF-${3000 + shipments.length + 1}`;
    const newShipment = {
      id: newId,
      company: data.customer,
      dest: `${data.destination}, India`,
      vehicle: 'Not Assigned',
      status: 'Pending',
      eta: 'TBD',
    };
    setShipments(prev => [newShipment, ...prev]);

    // Also add a booking entry
    const newBkId = `#BK-${6000 + bookings.length + 1}`;
    setBookings(prev => [{
      id: newBkId,
      customer: data.customer,
      origin: data.origin,
      dest: data.destination,
      cargo: data.cargoType,
      weight: `${data.weight} kg`,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }, ...prev]);

    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      type: 'info',
      title: `New shipment ${newId}`,
      desc: `${data.customer} — ${data.origin} → ${data.destination}`,
      time: 'Just now',
      read: false,
    }, ...prev]);
  };

  const addBooking = (data) => {
    const newId = `#BK-${6000 + bookings.length + 1}`;
    const newBooking = {
      id: newId,
      customer: data.customer,
      origin: data.origin,
      dest: data.dest,
      cargo: data.cargo,
      weight: `${data.weight} kg`,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setBookings(prev => [newBooking, ...prev]);

    setNotifications(prev => [{
      id: Date.now(),
      type: 'info',
      title: `New booking ${newId}`,
      desc: `${data.customer} — ${data.origin} → ${data.dest}`,
      time: 'Just now',
      read: false,
    }, ...prev]);
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppDataContext.Provider value={{ shipments, bookings, notifications, unreadCount, addShipment, addBooking, markAllRead }}>
      {children}
    </AppDataContext.Provider>
  );
}

export const useAppData = () => useContext(AppDataContext);
