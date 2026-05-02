import React, { useState } from 'react';
import { Package, CheckCircle2, Clock, XCircle, Eye, Pencil, Search, Plus, X, SlidersHorizontal } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const CARGO_TYPES = ['Electronics', 'Apparel', 'Machinery', 'Perishables', 'Chemicals', 'Auto Parts', 'Organic Goods', 'Textiles'];
const DESTINATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Nagpur'];

const StatusPill = ({ status }) => {
  const map = {
    'In Transit': { bg: '#e8f0fe', c: '#1a73e8' },
    'Pending':    { bg: '#fff3e0', c: '#e65100' },
    'Delivered':  { bg: '#e8f5e9', c: '#2e7d32' },
    'Cancelled':  { bg: '#fce4e4', c: '#c62828' },
  };
  const { bg, c } = map[status] || { bg: '#f5f5f0', c: '#888' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, backgroundColor: bg, color: c, padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: c }} />
      {status}
    </span>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div style={{ backgroundColor: '#fff', borderRadius: 12, width: 480, padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: 0 }}>{title}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex' }}><X size={18} /></button>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5, fontWeight: 500 }}>{label}</label>
    {children}
  </div>
);

const inputSt = {
  width: '100%', padding: '8px 11px', backgroundColor: '#f9f9f7',
  border: '1px solid #e2e2e2', borderRadius: 7, fontSize: 12,
  color: '#111', outline: 'none', boxSizing: 'border-box',
};

export default function Bookings() {
  const { bookings, addBooking } = useAppData();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: '', origin: 'Mumbai', dest: 'Delhi', cargo: 'Electronics', weight: '', notes: '' });

  const filtered = bookings.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.customer.toLowerCase().includes(search.toLowerCase()) ||
    b.origin.toLowerCase().includes(search.toLowerCase()) ||
    b.dest.toLowerCase().includes(search.toLowerCase()) ||
    b.cargo.toLowerCase().includes(search.toLowerCase()) ||
    b.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.customer || !form.weight) return;
    addBooking(form);
    setForm({ customer: '', origin: 'Mumbai', dest: 'Delhi', cargo: 'Electronics', weight: '', notes: '' });
    setShowModal(false);
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f0', minHeight: '100%', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111', margin: '0 0 4px 0' }}>Booking Management</h1>
          <p style={{ fontSize: 11, color: '#999', margin: 0 }}>Manage and track your cargo shipments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 16px', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={13} /> New Booking
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { icon: <Package size={14} color="#1a73e8" />,      bg: '#e8f0fe', label: 'Total Bookings', val: bookings.length },
          { icon: <CheckCircle2 size={14} color="#2e7d32" />, bg: '#e8f5e9', label: 'In Transit',     val: bookings.filter(b => b.status === 'In Transit').length },
          { icon: <Clock size={14} color="#e65100" />,        bg: '#fff3e0', label: 'Pending',        val: bookings.filter(b => b.status === 'Pending').length },
          { icon: <XCircle size={14} color="#c62828" />,      bg: '#fce4e4', label: 'Delivered',      val: bookings.filter(b => b.status === 'Delivered').length },
        ].map((c, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ width: 30, height: 30, backgroundColor: c.bg, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 500, color: '#111' }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* Table Panel */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#111', whiteSpace: 'nowrap' }}>All Bookings <span style={{ fontSize: 11, color: '#bbb', fontWeight: 400 }}>({filtered.length})</span></span>
          <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', width: 280 }}>
              <Search size={13} color="#bbb" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search bookings..."
                style={{ width: '100%', padding: '7px 12px 7px 30px', backgroundColor: '#f9f9f7', border: '1px solid #e2e2e2', borderRadius: 7, fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 7, fontSize: 12, color: '#555', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <SlidersHorizontal size={12} /> Filter
            </button>
          </div>
        </div>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0f0ec' }}>
              {['Booking ID', 'Customer', 'Route', 'Cargo', 'Weight', 'Status', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', fontSize: 9, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: '32px 16px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No bookings found</td></tr>
            ) : filtered.map((b, i) => (
              <tr key={b.id}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#fafaf8'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                style={{ borderBottom: '1px solid #f5f5f0', cursor: 'pointer' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 700, fontSize: 12, color: '#111' }}>{b.id}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 500, color: '#111' }}>{b.customer}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#555', whiteSpace: 'nowrap' }}>
                  <span style={{ fontWeight: 600, color: '#111' }}>{b.origin}</span>
                  <span style={{ color: '#ccc', margin: '0 6px' }}>→</span>
                  {b.dest}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#555' }}>{b.cargo}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#555' }}>{b.weight}</td>
                <td style={{ padding: '12px 16px' }}><StatusPill status={b.status} /></td>
                <td style={{ padding: '12px 16px', fontSize: 11, color: '#bbb', whiteSpace: 'nowrap' }}>{b.date}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[Eye, Pencil].map((Icon, j) => (
                      <button key={j} style={{ width: 26, height: 26, backgroundColor: 'transparent', border: 'none', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#bbb' }}
                        onMouseOver={e => { e.currentTarget.style.border = '1px solid #e8e8e4'; e.currentTarget.style.color = '#555'; }}
                        onMouseOut={e => { e.currentTarget.style.border = 'none'; e.currentTarget.style.color = '#bbb'; }}>
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Booking Modal */}
      {showModal && (
        <Modal title="New Booking" onClose={() => setShowModal(false)}>
          <Field label="Customer Name">
            <input value={form.customer} onChange={e => setForm({...form, customer: e.target.value})} placeholder="Company or person name" style={inputSt} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Origin">
              <select value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} style={inputSt}>
                {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Destination">
              <select value={form.dest} onChange={e => setForm({...form, dest: e.target.value})} style={inputSt}>
                {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Cargo Type">
            <select value={form.cargo} onChange={e => setForm({...form, cargo: e.target.value})} style={inputSt}>
              {CARGO_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Weight (kg)">
            <input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="e.g. 1000" style={inputSt} />
          </Field>
          <Field label="Notes (optional)">
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Special handling instructions..." rows={2} style={{ ...inputSt, resize: 'vertical' }} />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button onClick={() => setShowModal(false)} style={{ padding: '8px 18px', backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: 7, fontSize: 12, color: '#555', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleAdd} style={{ padding: '8px 18px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Add Booking</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
