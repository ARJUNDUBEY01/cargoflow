import React, { useState } from 'react';
import { Search, Truck, Zap } from 'lucide-react';

const SHIPMENTS = [
  { id: 'CF-2841', plate: 'MH-04-EX-2034', speed: 42,  eta: '2.4 hrs', status: 'Moving',     x: 28, y: 35 },
  { id: 'CF-2842', plate: 'DL-01-AB-1234', speed: 0,   eta: '12 hrs',  status: 'Stationary', x: 55, y: 20 },
  { id: 'CF-2843', plate: 'KA-01-HG-5543', speed: 65,  eta: '1.2 hrs', status: 'Moving',     x: 45, y: 60 },
  { id: 'CF-2844', plate: 'TN-09-ZX-7765', speed: 55,  eta: '5.5 hrs', status: 'Moving',     x: 65, y: 70 },
  { id: 'CF-2845', plate: 'GJ-05-KL-2321', speed: 0,   eta: 'Delay',   status: 'Stationary', x: 75, y: 40 },
];

export default function LiveTracking() {
  const [selected, setSelected] = useState(SHIPMENTS[0].id);
  const [search, setSearch] = useState('');

  const filtered = SHIPMENTS.filter(s =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f0', minHeight: '100%', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111', margin: '0 0 4px 0' }}>Live Tracking</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#999' }}>
          <span style={{ width: 7, height: 7, backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 0 2px rgba(34,197,94,0.25)' }} />
          Real-time GPS vehicle monitoring
        </div>
      </div>

      {/* Map + List */}
      <div style={{ display: 'flex', height: 520, backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, overflow: 'hidden' }}>

        {/* Left: Shipment List */}
        <div style={{ width: 300, borderRight: '1px solid #f0f0ec', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Search */}
          <div style={{ position: 'relative', borderBottom: '1px solid #f0f0ec' }}>
            <Search size={13} color="#bbb" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search shipment ID..."
              style={{ width: '100%', padding: '12px 12px 12px 34px', border: 'none', outline: 'none', fontSize: 12, backgroundColor: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(s => {
              const isMoving = s.status === 'Moving';
              const isSelected = s.id === selected;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  style={{
                    padding: '12px 14px',
                    borderBottom: '1px solid #f5f5f0',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#f0f5ff' : 'transparent',
                    transition: 'background 0.15s'
                  }}
                  onMouseOver={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#fafaf8'; }}
                  onMouseOut={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {/* Row 1: ID + Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#111' }}>{s.id}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      backgroundColor: isMoving ? '#e8f0fe' : '#fff3e0',
                      color: isMoving ? '#1a73e8' : '#e65100',
                      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                      padding: '2px 7px', borderRadius: 10, letterSpacing: '0.04em'
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: isMoving ? '#1a73e8' : '#e65100' }} />
                      {s.status}
                    </span>
                  </div>
                  {/* Row 2: Plate */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#555', marginBottom: 4 }}>
                    <Truck size={11} color="#bbb" />
                    <span style={{ fontFamily: 'monospace' }}>{s.plate}</span>
                  </div>
                  {/* Row 3: Speed + ETA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#aaa' }}>
                    <Zap size={10} color="#bbb" />
                    {s.speed} km/h &nbsp;·&nbsp; ETA: {s.eta}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Map */}
        <div style={{ flex: 1, backgroundColor: '#1a1f2e', position: 'relative', overflow: 'hidden' }}>
          {/* Grid overlay */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
            <defs>
              <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
          </svg>

          {/* Live badge */}
          <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', alignItems: 'center', gap: 7, backgroundColor: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
            <span style={{ width: 7, height: 7, backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)' }} />
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 500 }}>5 vehicles tracked</span>
          </div>

          {/* Vehicle Dots */}
          {SHIPMENTS.map(s => {
            const isMoving = s.status === 'Moving';
            const isSelected = s.id === selected;
            const size = isMoving ? 12 : 10;
            const dotColor = isMoving ? '#22c55e' : '#e65100';
            return (
              <div
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  position: 'absolute',
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 10 : 1
                }}
              >
                {/* Glow ring */}
                <div style={{
                  width: size + 10, height: size + 10,
                  borderRadius: '50%',
                  backgroundColor: isSelected
                    ? (isMoving ? 'rgba(34,197,94,0.3)' : 'rgba(230,81,0,0.3)')
                    : (isMoving ? 'rgba(34,197,94,0.15)' : 'rgba(230,81,0,0.15)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: dotColor, boxShadow: isSelected ? `0 0 8px ${dotColor}` : 'none' }} />
                </div>
                {/* Label */}
                {isSelected && (
                  <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 4, backgroundColor: '#fff', color: '#111', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                    {s.id}
                  </div>
                )}
              </div>
            );
          })}

          {/* Zoom buttons */}
          <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['+', '−'].map(z => (
              <button key={z} style={{ width: 30, height: 30, backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7, color: '#fff', fontSize: 16, fontWeight: 300, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {z}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
