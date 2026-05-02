import React, { useState } from 'react';
import { Truck, CheckCircle2, AlertTriangle, Info, MapPin, User, Fuel, Eye } from 'lucide-react';

const FLEET = [
  { id: 'VH-9021', type: 'Heavy Truck',   loc: 'Mumbai, IN',    fuel: 85, status: 'Active' },
  { id: 'VH-9022', type: 'Container',      loc: 'Delhi, IN',     fuel: 0,  status: 'Maintenance' },
  { id: 'VH-9023', type: 'Mini Van',       loc: 'Pune, IN',      fuel: 0,  status: 'Idle' },
  { id: 'VH-9024', type: 'Flatbed',        loc: 'Bangalore, IN', fuel: 92, status: 'Active' },
];

const StatusLabel = ({ status }) => {
  const map = {
    'Active':      { bg: '#e8f5e9', color: '#2e7d32' },
    'Maintenance': { bg: '#fce4e4', color: '#c62828' },
    'Idle':        { bg: '#f5f5f0', color: '#888' },
  };
  const { bg, color } = map[status] || { bg: '#f5f5f0', color: '#888' };
  return (
    <span style={{ backgroundColor: bg, color, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 8px', borderRadius: 10 }}>
      {status}
    </span>
  );
};

export default function Fleet() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f0', minHeight: '100%', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111', margin: '0 0 4px 0' }}>Fleet Management</h1>
          <p style={{ fontSize: 11, color: '#999', margin: 0 }}>Monitor and manage your logistics vehicle assets</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 7, fontSize: 12, color: '#555', cursor: 'pointer' }}>
          Filter
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { icon: <Truck size={14} color="#1a73e8" />, bg: '#e8f0fe', label: 'Total Vehicles', val: FLEET.length },
          { icon: <CheckCircle2 size={14} color="#2e7d32" />, bg: '#e8f5e9', label: 'Active', val: FLEET.filter(v => v.status === 'Active').length, badge: '+1', up: true },
          { icon: <AlertTriangle size={14} color="#c62828" />, bg: '#fce4e4', label: 'In Maintenance', val: FLEET.filter(v => v.status === 'Maintenance').length },
          { icon: <Info size={14} color="#e65100" />, bg: '#fff3e0', label: 'Idle', val: FLEET.filter(v => v.status === 'Idle').length },
        ].map((c, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: '14px 16px', position: 'relative' }}>
            <div style={{ width: 30, height: 30, backgroundColor: c.bg, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{c.icon}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</span>
              {c.badge && <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>{c.badge}</span>}
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, color: '#111' }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* Vehicle Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {FLEET.map((v, i) => {
          const fuelColor = v.fuel === 0 ? '#c62828' : v.fuel < 30 ? '#e65100' : '#1a73e8';
          return (
            <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, backgroundColor: '#f5f5f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Truck size={16} color="#888" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111', fontFamily: 'monospace' }}>{v.id}</div>
                    <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{v.type}</div>
                  </div>
                </div>
                <StatusLabel status={v.status} />
              </div>

              {/* Info rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#555' }}>
                  <MapPin size={12} color="#bbb" /> {v.loc}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#555' }}>
                  <User size={12} color="#bbb" /> <span style={{ color: '#aaa' }}>Driver: Unassigned</span>
                </div>
              </div>

              {/* Fuel bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#aaa' }}>
                    <Fuel size={11} color="#bbb" /> Fuel
                  </div>
                  <span style={{ fontSize: 10, color: fuelColor, fontWeight: 600 }}>{v.fuel}%</span>
                </div>
                <div style={{ height: 4, backgroundColor: '#f0f0ec', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${v.fuel}%`, backgroundColor: fuelColor, borderRadius: 2, transition: 'width 0.3s' }} />
                </div>
              </div>

              {/* Button */}
              <button
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#eceae3'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#f5f5f0'}
                style={{ width: '100%', padding: '8px 0', backgroundColor: '#f5f5f0', border: '1px solid #e8e8e4', borderRadius: 7, fontSize: 11, fontWeight: 500, color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background 0.15s' }}>
                <Eye size={12} /> View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
