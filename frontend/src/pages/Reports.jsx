import React, { useState } from 'react';
import { TrendingUp, Package, Clock, Star, Download, ChevronDown } from 'lucide-react';

const BARS = [
  { day: 'Mon', h: 45 }, { day: 'Tue', h: 58 }, { day: 'Wed', h: 72 },
  { day: 'Thu', h: 65 }, { day: 'Fri', h: 90 }, { day: 'Sat', h: 50 }, { day: 'Sun', h: 38 }
];

const ROUTES = [
  { from: 'Mumbai',    to: 'Delhi',     vol: 450, delta: '+5%',  up: true },
  { from: 'Bangalore', to: 'Chennai',   vol: 320, delta: '+2%',  up: true },
  { from: 'Pune',      to: 'Hyderabad', vol: 280, delta: '-1%',  up: false },
  { from: 'Delhi',     to: 'Kolkata',   vol: 210, delta: '+8%',  up: true },
  { from: 'Ahmedabad', to: 'Mumbai',    vol: 190, delta: '+12%', up: true },
];

const KPI_DATA = [
  { icon: <TrendingUp size={14} color="#2e7d32" />, bg: '#e8f5e9', label: 'Total Revenue',          val: '$124.5k', badge: '+12.5%', up: true  },
  { icon: <Package    size={14} color="#1a73e8" />, bg: '#e8f0fe', label: 'Shipments Completed',    val: '1,432',   badge: '+8.2%',  up: true  },
  { icon: <Clock      size={14} color="#e65100" />, bg: '#fff3e0', label: 'Avg Delivery Time',      val: '1.8 Days',badge: '-0.4%',  up: false },
  { icon: <Star       size={14} color="#7c3aed" />, bg: '#f3e8fd', label: 'Customer Satisfaction',  val: '4.8/5.0', badge: '+0.1',   up: true  },
];

const SUMMARIES = [
  { label: 'Most Profitable Route', val: 'Mumbai → Delhi',       sub: '$12,400 this month',      color: '#1a73e8' },
  { label: 'Highest Volume Day',    val: 'Friday',               sub: 'Avg 28 shipments/day',    color: '#2e7d32' },
  { label: 'Fleet Utilization',     val: '72.5%',                sub: '4 of 8 vehicles active',  color: '#7c3aed' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('Last 7 Days');
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f0', minHeight: '100%', fontFamily: 'system-ui, sans-serif' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111', margin: '0 0 4px 0' }}>Analytics & Reports</h1>
          <p style={{ fontSize: 11, color: '#999', margin: 0 }}>Performance metrics and business intelligence</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              style={{ appearance: 'none', padding: '7px 28px 7px 12px', backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 7, fontSize: 12, color: '#555', cursor: 'pointer', outline: 'none' }}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <ChevronDown size={12} color="#aaa" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 7, fontSize: 12, color: '#555', cursor: 'pointer' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        {KPI_DATA.map((c, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ width: 30, height: 30, backgroundColor: c.bg, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              {c.icon}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</span>
              <span style={{ backgroundColor: c.up ? '#e8f5e9' : '#fce4e4', color: c.up ? '#2e7d32' : '#c62828', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>
                {c.badge}
              </span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, color: '#111' }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>

        {/* Bar Chart */}
        <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>Revenue Overview</div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>This week</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
            {BARS.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 6 }}>
                <div
                  onMouseOver={() => setHoveredBar(i)}
                  onMouseOut={() => setHoveredBar(null)}
                  style={{
                    width: '100%',
                    height: `${b.h}%`,
                    backgroundColor: hoveredBar === i ? '#1a73e8' : 'rgba(26,115,232,0.6)',
                    borderRadius: '4px 4px 0 0',
                    cursor: 'pointer',
                    transition: 'background 0.15s'
                  }}
                />
                <span style={{ fontSize: 10, color: '#bbb' }}>{b.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Routes */}
        <div style={{ width: 280, backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: 20, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#111', marginBottom: 16 }}>Top Routes</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f0f0ec', marginBottom: 4 }}>
            <span style={{ fontSize: 9, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Route</span>
            <span style={{ fontSize: 9, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Volume</span>
          </div>

          {ROUTES.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < ROUTES.length - 1 ? '1px solid #f5f5f0' : 'none' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#111' }}>{r.from} → {r.to}</div>
                <div style={{ fontSize: 10, color: r.up ? '#2e7d32' : '#c62828', marginTop: 2 }}>{r.delta}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{r.vol}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {SUMMARIES.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#111', marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: s.color, fontWeight: 500 }}>{s.sub}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
