import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import api from '../utils/api';

const BookingModal = ({ isOpen, onClose, onBookingCreated }) => {
  const [formData, setFormData] = useState({
    customer: '',
    origin: '',
    destination: '',
    cargoType: 'Standard Cargo',
    weight: '',
    pickupDate: '',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/bookings', formData);
      onBookingCreated(res.data.data);
      onClose();
      setFormData({
        customer: '', origin: '', destination: '', cargoType: 'Standard Cargo', weight: '', pickupDate: '', status: 'Pending'
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-sans">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-[#1C1B19] font-syne uppercase">New Booking</h2>
            <p className="text-xs text-gray-500 mt-1">Create a new shipment record.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg font-semibold">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Name</label>
            <input required type="text" placeholder="e.g. Acme Corp" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1A56C4] focus:ring-1 focus:ring-[#1A56C4] transition-all" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Origin</label>
              <input required type="text" placeholder="e.g. Mumbai, IN" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1A56C4] focus:ring-1 focus:ring-[#1A56C4] transition-all" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destination</label>
              <input required type="text" placeholder="e.g. Delhi, IN" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1A56C4] focus:ring-1 focus:ring-[#1A56C4] transition-all" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo Type</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1A56C4] focus:ring-1 focus:ring-[#1A56C4] transition-all" value={formData.cargoType} onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}>
                <option value="Standard Cargo">Standard Cargo</option>
                <option value="Fragile">Fragile</option>
                <option value="Hazardous">Hazardous</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Oversized">Oversized</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Weight (kg)</label>
              <input required type="number" placeholder="1000" min="1" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1A56C4] focus:ring-1 focus:ring-[#1A56C4] transition-all" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Date</label>
            <input required type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1A56C4] focus:ring-1 focus:ring-[#1A56C4] transition-all" value={formData.pickupDate} onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })} />
          </div>

          <div className="pt-6 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-[#1A56C4] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
