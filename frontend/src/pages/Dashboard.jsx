import React, { useState } from 'react';
import { Package, Truck, AlertCircle, TrendingUp, MoreVertical, Download, Search, Plus, X } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const CARGO_TYPES = ['Electronics', 'Apparel', 'Machinery', 'Perishables', 'Chemicals', 'Auto Parts', 'Organic Goods', 'Textiles'];

const StatusPill = ({ status }) => {
  const map = {
    'In Transit': { bg: '#e8f0fe', c: '#1a73e8' },
    'Pending':    { bg: '#fff3e0', c: '#e65100' },
    'Delivered':  { bg: '#e8f5e9', c: '#2e7d32' },
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

export default function Dashboard() {
  const { shipments, addShipment } = useAppData();
  const [tab, setTab] = useState('In Transit');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: '', origin: '', destination: '', cargoType: 'Electronics', weight: '', pickupDate: '' });

  const tabMap = { 'In Transit': 'In Transit', 'Pending': 'Pending', 'Delivered': 'Delivered' };
  const tabCounts = {
    'In Transit': shipments.filter(s => s.status === 'In Transit').length,
    'Pending':    shipments.filter(s => s.status === 'Pending').length,
    'Delivered':  shipments.filter(s => s.status === 'Delivered').length,
  };

  const tableData = shipments
    .filter(s => s.status === tabMap[tab])
    .filter(s =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.company.toLowerCase().includes(search.toLowerCase()) ||
      s.dest.toLowerCase().includes(search.toLowerCase()) ||
      s.vehicle.toLowerCase().includes(search.toLowerCase())
    );

  const handleAdd = () => {
    if (!form.customer || !form.origin || !form.destination) return;
    addShipment(form);
    setForm({ customer: '', origin: '', destination: '', cargoType: 'Electronics', weight: '', pickupDate: '' });
    setShowModal(false);
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f0', minHeight: '100%', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111', margin: '0 0 4px 0' }}>Operations Overview</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#999' }}>
            <span style={{ width: 6, height: 6, backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
            Real-time logistics monitoring and fleet analytics.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 7, padding: '7px 14px', fontSize: 12, color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={12} /> Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: 7, padding: '7px 16px', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={13} /> New Shipment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { icon: <Package size={14} color="#1a73e8" />,   bg: '#e8f0fe', label: 'Active Bookings',  val: shipments.filter(s => s.status === 'In Transit').length, badge: '+12%', up: true },
          { icon: <Truck size={14} color="#e65100" />,     bg: '#fff3e0', label: 'Fleet in Transit', val: shipments.filter(s => s.status === 'In Transit').length, badge: '+5%',  up: true },
          { icon: <AlertCircle size={14} color="#c62828" />,bg: '#fce4e4',label: 'System Alerts',    val: 3, badge: '-2', up: false },
          { icon: <TrendingUp size={14} color="#2e7d32" />, bg: '#e8f5e9', label: 'Total Revenue',   val: `$${(48.2 + shipments.filter(s=>s.status==='Delivered').length * 1.2).toFixed(1)}k`, badge: '+18%', up: true },
        ].map((c, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ width: 30, height: 30, backgroundColor: c.bg, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{c.icon}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</span>
              <span style={{ backgroundColor: c.up ? '#e8f5e9' : '#fce4e4', color: c.up ? '#2e7d32' : '#c62828', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>{c.badge}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, color: '#111' }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* Shipments Table Panel */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, overflow: 'hidden' }}>
        {/* Tab + Search header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', backgroundColor: '#f0f0ec', borderRadius: 7, padding: 3, gap: 2 }}>
            {Object.entries(tabCounts).map(([t, count]) => {
              const active = tab === t;
              return (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '5px 14px', border: 'none', borderRadius: 5, fontSize: 12, fontWeight: active ? 600 : 400, backgroundColor: active ? '#fff' : 'transparent', color: active ? '#111' : '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.15s' }}>
                  {t}
                  <span style={{ backgroundColor: active ? '#111' : '#ddd', color: active ? '#fff' : '#888', fontSize: 10, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>{count}</span>
                </button>
              );
            })}
          </div>
          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <Search size={13} color="#bbb" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by ID, company, destination..."
              style={{ width: '100%', padding: '7px 12px 7px 30px', backgroundColor: '#f9f9f7', border: '1px solid #e2e2e2', borderRadius: 7, fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Table */}
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0f0ec' }}>
              {['Shipment ID', 'Destination', 'Vehicle', 'Status', 'ETA', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', fontSize: 9, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '32px 16px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No shipments found</td></tr>
            ) : tableData.map((s, i) => (
              <tr key={s.id}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#fafaf8'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                style={{ borderBottom: '1px solid #f5f5f0', cursor: 'pointer' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 12, color: '#111' }}>{s.id}</div>
                  <div style={{ fontSize: 10, color: '#bbb', marginTop: 2 }}>{s.company}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#555' }}>{s.dest}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#f5f5f0', border: '1px solid #e8e8e4', borderRadius: 4, padding: '2px 7px', fontFamily: 'monospace', fontSize: 11, color: '#555' }}>{s.vehicle}</span>
                </td>
                <td style={{ padding: '12px 16px' }}><StatusPill status={s.status} /></td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#bbb' }}>{s.eta}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb' }}><MoreVertical size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Shipment Modal */}
      {showModal && (
        <Modal title="New Shipment" onClose={() => setShowModal(false)}>
          <Field label="Customer Name">
            <input value={form.customer} onChange={e => setForm({...form, customer: e.target.value})} placeholder="Company name" style={inputSt} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Origin">
              <input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} placeholder="e.g. Mumbai" style={inputSt} />
            </Field>
            <Field label="Destination">
              <input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} placeholder="e.g. Delhi" style={inputSt} />
            </Field>
          </div>
          <Field label="Cargo Type">
            <select value={form.cargoType} onChange={e => setForm({...form, cargoType: e.target.value})} style={inputSt}>
              {CARGO_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Weight (kg)">
              <input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="e.g. 1000" style={inputSt} />
            </Field>
            <Field label="Pickup Date">
              <input type="date" value={form.pickupDate} onChange={e => setForm({...form, pickupDate: e.target.value})} style={inputSt} />
            </Field>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button onClick={() => setShowModal(false)} style={{ padding: '8px 18px', backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: 7, fontSize: 12, color: '#555', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleAdd} style={{ padding: '8px 18px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Add Shipment</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
