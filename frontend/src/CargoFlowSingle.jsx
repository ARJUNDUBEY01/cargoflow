import React, { useState } from 'react';
import {
  Package, LayoutDashboard, Truck, MapPin, BarChart2, Settings, Search, Bell, User as UserIcon,
  LogOut, Download, Plus, AlertCircle, TrendingUp, MoreVertical, CheckCircle2, Clock, XCircle,
  ArrowRight, RefreshCw, Fuel, Eye, Navigation, Zap, Link2, Shield, CreditCard, Blocks
} from 'lucide-react';

// --- DATA ---
const ACTIVE_SHIPMENTS = [
  { id: '#CF-2841', company: 'Global Tech Solutions', dest: 'Mumbai, India', vehicle: 'MH-04-EX-2034', status: 'IN TRANSIT', eta: '2.4 hrs' },
  { id: '#CF-2842', company: 'Retail Giant Corp', dest: 'Delhi, India', vehicle: 'DL-07-CX-1122', status: 'IN TRANSIT', eta: '3.1 hrs' },
  { id: '#CF-2843', company: 'Eco Green Logistics', dest: 'Pune, India', vehicle: 'MH-12-PQ-4455', status: 'IN TRANSIT', eta: '1.8 hrs' },
  { id: '#CF-2844', company: 'Sunrise Exports', dest: 'Chennai, India', vehicle: 'TN-09-AB-7890', status: 'IN TRANSIT', eta: '5.2 hrs' },
  { id: '#CF-2845', company: 'NextGen Freight', dest: 'Bangalore, India', vehicle: 'KA-01-MN-3344', status: 'IN TRANSIT', eta: '4.0 hrs' },
  { id: '#CF-2846', company: 'BlueWave Traders', dest: 'Hyderabad, India', vehicle: 'TS-08-GH-6677', status: 'IN TRANSIT', eta: '6.5 hrs' },
  { id: '#CF-2847', company: 'SkyRocket Cargo', dest: 'Kolkata, India', vehicle: 'WB-02-RS-9988', status: 'IN TRANSIT', eta: '8.3 hrs' },
  { id: '#CF-2848', company: 'OceanPort Logistics', dest: 'Ahmedabad, India', vehicle: 'GJ-05-UV-2211', status: 'IN TRANSIT', eta: '3.7 hrs' }
];

const PENDING_COMPANIES = ['Metro Supplies', 'Horizon Freight', 'Apex Logistics', 'Delta Cargo', 'Crest Traders', 'Swift Movers', 'Pinnacle Goods', 'Sterling Exports', 'TrueNorth Cargo', 'Orbit Logistics', 'Titan Freight', 'Nova Cargo'];
const PENDING_SHIPMENTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `#CF-290${i}`, company: PENDING_COMPANIES[i], dest: 'Various, India', vehicle: 'Not Assigned', status: 'PENDING', eta: 'TBD'
}));

const COMPLETED_SHIPMENTS = Array.from({ length: 5 }).map((_, i) => ({
  id: `#CF-270${i}`, company: 'Past Client Ltd', dest: 'Mumbai, India', vehicle: 'MH-01-XX-1234', status: 'DELIVERED', eta: 'Done'
}));

const SHIPMENTS = { active: ACTIVE_SHIPMENTS, pending: PENDING_SHIPMENTS, completed: COMPLETED_SHIPMENTS };

const BOOKINGS = [
  { id: '#BK-5501', customer: 'Global Tech Solutions', route: 'Mumbai → Delhi', type: 'Electronics', weight: '1,200 kg', status: 'CONFIRMED', date: 'May 3, 2026' },
  { id: '#BK-5502', customer: 'Retail Giant Corp', route: 'Chennai → Bangalore', type: 'Apparel', weight: '850 kg', status: 'PENDING', date: 'May 4, 2026' },
  { id: '#BK-5503', customer: 'Eco Green Logistics', route: 'Pune → Hyderabad', type: 'Organic Goods', weight: '640 kg', status: 'CONFIRMED', date: 'May 4, 2026' },
  { id: '#BK-5504', customer: 'Sunrise Exports', route: 'Ahmedabad → Kolkata', type: 'Textiles', weight: '2,100 kg', status: 'IN TRANSIT', date: 'May 2, 2026' },
  { id: '#BK-5505', customer: 'NextGen Freight', route: 'Delhi → Jaipur', type: 'Auto Parts', weight: '980 kg', status: 'CANCELLED', date: 'May 1, 2026' },
  { id: '#BK-5506', customer: 'BlueWave Traders', route: 'Surat → Mumbai', type: 'Chemicals', weight: '1,750 kg', status: 'CONFIRMED', date: 'May 5, 2026' },
  { id: '#BK-5507', customer: 'SkyRocket Cargo', route: 'Kolkata → Chennai', type: 'Machinery', weight: '3,400 kg', status: 'PENDING', date: 'May 5, 2026' },
  { id: '#BK-5508', customer: 'OceanPort Logistics', route: 'Bangalore → Pune', type: 'Perishables', weight: '520 kg', status: 'IN TRANSIT', date: 'May 2, 2026' },
];

const FLEET = [
  { plate: 'MH-04-EX-2034', type: 'Heavy Truck', driver: 'Rajesh Kumar', loc: 'Mumbai → Delhi', status: 'ACTIVE', fuel: 78 },
  { plate: 'DL-07-CX-1122', type: 'Container Truck', driver: 'Amit Singh', loc: 'Delhi → Chandigarh', status: 'ACTIVE', fuel: 55 },
  { plate: 'MH-12-PQ-4455', type: 'Mini Van', driver: 'Suresh Patil', loc: 'Pune Depot', status: 'IDLE', fuel: 92 },
  { plate: 'TN-09-AB-7890', type: 'Refrigerated Truck', driver: 'Karthik Rajan', loc: 'Chennai → Bangalore', status: 'ACTIVE', fuel: 34 },
  { plate: 'KA-01-MN-3344', type: 'Flatbed Truck', driver: 'Venkat Rao', loc: 'Bangalore Service Center', status: 'MAINTENANCE', fuel: 20 },
  { plate: 'TS-08-GH-6677', type: 'Heavy Truck', driver: 'Ravi Shankar', loc: 'Hyderabad → Mumbai', status: 'ACTIVE', fuel: 61 },
  { plate: 'WB-02-RS-9988', type: 'Container Truck', driver: 'Debashish Roy', loc: 'Kolkata Depot', status: 'IDLE', fuel: 88 },
  { plate: 'GJ-05-UV-2211', type: 'Mini Van', driver: 'Hardik Patel', loc: 'Ahmedabad → Surat', status: 'ACTIVE', fuel: 47 },
];

const TRACKING_SHIPMENTS = [
  { id: '#CF-2841', company: 'Global Tech Solutions', route: 'Mumbai → Delhi', prog: 65, eta: '2.4 hrs', driver: 'Rajesh', x: 38, y: 30 },
  { id: '#CF-2842', company: 'Retail Giant Corp', route: 'Delhi → Chandigarh', prog: 40, eta: '3.1 hrs', driver: 'Amit', x: 35, y: 22 },
  { id: '#CF-2843', company: 'Eco Green Logistics', route: 'Pune → Hyderabad', prog: 80, eta: '1.8 hrs', driver: 'Suresh', x: 42, y: 52 },
  { id: '#CF-2844', company: 'Sunrise Exports', route: 'Chennai → Bangalore', prog: 25, eta: '5.2 hrs', driver: 'Karthik', x: 50, y: 62 },
  { id: '#CF-2845', company: 'NextGen Freight', route: 'Bangalore → Mumbai', prog: 55, eta: '4.0 hrs', driver: 'Ravi', x: 44, y: 58 },
];

const WEEKLY_REVENUE = [
  { day: 'Mon', val: 6200 }, { day: 'Tue', val: 8100 }, { day: 'Wed', val: 7400 },
  { day: 'Thu', val: 9800 }, { day: 'Fri', val: 11200 }, { day: 'Sat', val: 7600 }, { day: 'Sun', val: 5400 }
];

const TOP_ROUTES = [
  { route: 'Mumbai → Delhi', vol: 48, rev: '$12,400', time: '18 hrs' },
  { route: 'Bangalore → Chennai', vol: 36, rev: '$8,900', time: '6 hrs' },
  { route: 'Pune → Hyderabad', vol: 29, rev: '$7,200', time: '9 hrs' },
  { route: 'Delhi → Chandigarh', vol: 24, rev: '$4,800', time: '4 hrs' },
  { route: 'Ahmedabad → Mumbai', vol: 21, rev: '$5,100', time: '8 hrs' },
];

// --- REUSABLE COMPONENTS ---

const StatusBadge = ({ status }) => {
  let bg = '#f3f4f6', color = '#6b7280';
  if (status === 'IN TRANSIT') { bg = '#dbeafe'; color = '#1d4ed8'; }
  else if (status === 'PENDING') { bg = '#fef9c3'; color = '#a16207'; }
  else if (status === 'DELIVERED' || status === 'CONFIRMED' || status === 'ACTIVE') { bg = '#dcfce7'; color = '#15803d'; }
  else if (status === 'CANCELLED' || status === 'MAINTENANCE') { bg = '#fee2e2'; color = '#b91c1c'; }

  return (
    <span style={{ backgroundColor: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
      {status}
    </span>
  );
};

const StatCard = ({ icon, label, value, badge, badgeUp, color }) => (
  <div style={{ flex: 1, backgroundColor: "#ffffff", border: "0.5px solid #e5e3dc", borderRadius: 10, padding: "14px 16px", position: "relative" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
      {React.cloneElement(icon, { size: 14, color })}
      <span style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{label}</span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: "#111" }}>{value}</div>
    {badge && (
      <div style={{ position: "absolute", top: 12, right: 12, backgroundColor: badgeUp ? "#dcfce7" : "#fee2e2", color: badgeUp ? "#15803d" : "#b91c1c", fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>
        {badge}
      </div>
    )}
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
    <div style={{ backgroundColor: "#fff", width: 480, borderRadius: 14, padding: 28, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{title}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}><XCircle size={20} /></button>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, placeholder, type = "text", as = "input", options = [] }) => (
  <div style={{ marginBottom: 12, width: "100%" }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>{label}</label>
    {as === "select" ? (
      <select style={{ width: "100%", padding: "8px 10px", border: "1px solid #e0ddd7", borderRadius: 8, fontSize: 13, backgroundColor: "#fff" }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} placeholder={placeholder} style={{ width: "100%", padding: "8px 10px", border: "1px solid #e0ddd7", borderRadius: 8, fontSize: 13 }} />
    )}
  </div>
);

const Toggle = ({ defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div onClick={() => setOn(!on)} style={{ width: 40, height: 22, backgroundColor: on ? "#111" : "#d1d5db", borderRadius: 11, position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
      <div style={{ width: 16, height: 16, backgroundColor: "#fff", borderRadius: 8, position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.2s" }} />
    </div>
  );
};

const Sidebar = ({ page, setPage }) => {
  const navs = [
    { id: 'dashboard', icon: <LayoutDashboard size={14} />, label: 'Dashboard' },
    { id: 'bookings', icon: <Package size={14} />, label: 'Bookings' },
    { id: 'fleet', icon: <Truck size={14} />, label: 'Fleet' },
    { id: 'tracking', icon: <MapPin size={14} />, label: 'Tracking' },
    { id: 'analytics', icon: <BarChart2 size={14} />, label: 'Analytics' },
    { id: 'settings', icon: <Settings size={14} />, label: 'Settings' },
  ];

  return (
    <div style={{ width: 200, backgroundColor: "#111", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 16px", borderBottom: "0.5px solid #2a2a2a", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, backgroundColor: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#111" }}>
          <Package size={16} />
        </div>
        <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.05em", color: "#fff" }}>CARGOFLOW</span>
      </div>
      <div style={{ padding: "16px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navs.map(n => {
          const isActive = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, width: "100%", border: "none", cursor: "pointer", borderRadius: 6, backgroundColor: isActive ? "#1d4ed8" : "transparent", color: isActive ? "#fff" : "#888", fontWeight: isActive ? 700 : 500, transition: "all 0.1s" }}>
              {n.icon} {n.label}
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: "auto", borderTop: "0.5px solid #2a2a2a", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, backgroundColor: "#1d4ed8", borderRadius: 15, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>JD</div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#eee" }}>John Doe</div>
            <div style={{ fontSize: 11, color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>john.doe@example.com</div>
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "10px 0 0", border: "none", borderTop: "0.5px solid #222", backgroundColor: "transparent", color: "#555", fontSize: 12, cursor: "pointer" }}>
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </div>
  );
};

const Topbar = () => (
  <div style={{ backgroundColor: "#f5f4f0", borderBottom: "0.5px solid #e5e3dc", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
      <Search size={14} color="#888" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
      <input type="text" placeholder="Search shipments, vehicles..." style={{ width: "100%", padding: "8px 12px 8px 34px", backgroundColor: "#eceae3", border: "0.5px solid #ddd", borderRadius: 8, fontSize: 13, outline: "none" }} />
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      <button style={{ border: "0.5px solid #ddd", borderRadius: 8, padding: "7px 9px", backgroundColor: "#fff", cursor: "pointer", color: "#555" }}><Bell size={16} /></button>
      <button style={{ border: "0.5px solid #ddd", borderRadius: 8, padding: "7px 9px", backgroundColor: "#fff", cursor: "pointer", color: "#555" }}><UserIcon size={16} /></button>
    </div>
  </div>
);

// --- PAGES ---

const Dashboard = () => {
  const [tab, setTab] = useState('active');
  const [showModal, setShowModal] = useState(false);

  const renderTable = () => {
    const data = SHIPMENTS[tab];
    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {['Shipment ID', 'Destination', 'Vehicle', 'Status', 'ETA', ''].map(h => (
              <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "left", borderBottom: "0.5px solid #f0ede6" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: i === data.length - 1 ? 'none' : "0.5px solid #f7f5f0" }}>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                <div style={{ fontWeight: 800, color: "#111" }}>{row.id}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{row.company}</div>
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>{row.dest}</td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Truck size={13} color="#888" /> {row.vehicle}</div>
              </td>
              <td style={{ padding: "12px 16px", fontSize: 13 }}><StatusBadge status={row.status} /></td>
              <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700 }}>{row.eta}</td>
              <td style={{ padding: "12px 16px", fontSize: 13, textAlign: "right" }}><MoreVertical size={14} color="#888" style={{ cursor: "pointer" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "0.01em", margin: "0 0 4px 0" }}>OPERATIONS OVERVIEW</h1>
          <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Real-time logistics monitoring and fleet analytics.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ backgroundColor: "#fff", border: "0.5px solid #ddd", borderRadius: 8, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center" }}><Download size={14} color="#111" /></button>
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}><Plus size={14} /> New Shipment</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <StatCard icon={<Package />} label="Active Bookings" value="124" badge="+12%" badgeUp color="#1d4ed8" />
        <StatCard icon={<Truck />} label="Fleet in Transit" value="42" badge="+5%" badgeUp color="#ea580c" />
        <StatCard icon={<AlertCircle />} label="System Alerts" value="3" badge="-2" badgeUp={false} color="#dc2626" />
        <StatCard icon={<TrendingUp />} label="Total Revenue" value="$48.2k" badge="+18%" badgeUp color="#15803d" />
      </div>

      <div>
        <div style={{ display: "flex", gap: 4 }}>
          {['active', 'pending', 'completed'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "12px 20px", border: "none", backgroundColor: tab === t ? "#fff" : "transparent", color: tab === t ? "#111" : "#888", fontWeight: tab === t ? 700 : 600, fontSize: 13, borderBottom: tab === t ? "2px solid #111" : "2px solid transparent", borderRadius: tab === t ? "8px 8px 0 0" : 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {t.charAt(0).toUpperCase() + t.slice(1)} Shipments
              <span style={{ backgroundColor: tab === t ? "#111" : "#e5e5e5", color: tab === t ? "#fff" : "#555", fontSize: 10, padding: "2px 8px", borderRadius: 10 }}>{SHIPMENTS[t].length}</span>
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: "#fff", borderRadius: "0 8px 8px 8px", border: "0.5px solid #e5e3dc", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", display: "flex", justifyContent: "flex-end", borderBottom: "0.5px solid #f0ede6" }}>
             <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555", fontWeight: 600 }}><Search size={12}/> Filter</button>
          </div>
          {renderTable()}
        </div>
      </div>

      {showModal && (
        <Modal title="New Shipment" onClose={() => setShowModal(false)}>
          <Input label="Customer Name" placeholder="Enter company name" />
          <div style={{ display: "flex", gap: 12 }}>
            <Input label="Origin" placeholder="City, Country" />
            <Input label="Destination" placeholder="City, Country" />
          </div>
          <Input label="Cargo Type" as="select" options={['Electronics', 'Apparel', 'Machinery', 'Perishables', 'Chemicals', 'Auto Parts', 'Organic Goods', 'Textiles']} />
          <div style={{ display: "flex", gap: 12 }}>
            <Input label="Weight (kg)" type="number" placeholder="1000" />
            <Input label="Pickup Date" type="date" />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
            <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", backgroundColor: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Create Shipment</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Bookings = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "0.01em", margin: "0 0 4px 0" }}>BOOKING MANAGEMENT</h1>
          <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Manage all cargo booking requests and schedules.</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}><Plus size={14} /> New Booking</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <StatCard icon={<Package />} label="Total Bookings" value="284" badge="+9%" badgeUp color="#1d4ed8" />
        <StatCard icon={<CheckCircle2 />} label="Confirmed" value="198" badge="+14%" badgeUp color="#15803d" />
        <StatCard icon={<Clock />} label="Pending" value="72" badge="+3%" badgeUp color="#ea580c" />
        <StatCard icon={<XCircle />} label="Cancelled" value="14" badge="-2%" badgeUp={false} color="#dc2626" />
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: 10, border: "0.5px solid #e5e3dc", overflow: "hidden" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              {['Booking ID', 'Customer', 'Route', 'Cargo Type', 'Weight', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "left", borderBottom: "0.5px solid #f0ede6" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((row, i) => (
              <tr key={i} style={{ borderBottom: i === BOOKINGS.length - 1 ? 'none' : "0.5px solid #f7f5f0" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 800, color: "#111" }}>{row.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>{row.customer}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, whiteSpace: "nowrap" }}>
                  {row.route.split('→').map((p, idx) => (
                     <React.Fragment key={idx}>
                       {idx > 0 && <ArrowRight size={11} color="#bbb" style={{ margin: "0 4px", verticalAlign: "middle" }} />}
                       {p.trim()}
                     </React.Fragment>
                  ))}
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>{row.type}</td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>{row.weight}</td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}><StatusBadge status={row.status} /></td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>{row.date}</td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "4px 10px", fontSize: 11, border: "0.5px solid #ddd", borderRadius: 6, backgroundColor: "#fff", cursor: "pointer", fontWeight: 600 }}>View</button>
                    <button style={{ padding: "4px 10px", fontSize: 11, border: "0.5px solid #ddd", borderRadius: 6, backgroundColor: "#fff", cursor: "pointer", fontWeight: 600 }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="New Booking" onClose={() => setShowModal(false)}>
           <Input label="Customer Name" placeholder="Company Name" />
           <div style={{ display: "flex", gap: 12 }}>
             <Input label="Origin" placeholder="From" />
             <Input label="Destination" placeholder="To" />
           </div>
           <Input label="Cargo Type" as="select" options={['Electronics', 'Apparel', 'Machinery', 'Perishables', 'Chemicals', 'Auto Parts', 'Organic Goods', 'Textiles']} />
           <div style={{ display: "flex", gap: 12 }}>
             <Input label="Weight (kg)" type="number" placeholder="1000" />
             <Input label="Pickup Date" type="date" />
           </div>
           <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
             <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
             <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", backgroundColor: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Booking</button>
           </div>
        </Modal>
      )}
    </div>
  );
};

const Fleet = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "0.01em", margin: "0 0 4px 0" }}>FLEET MANAGEMENT</h1>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Monitor and manage your entire vehicle fleet.</p>
      </div>
      <button style={{ backgroundColor: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Add Vehicle</button>
    </div>

    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      <StatCard icon={<Truck />} label="Total Vehicles" value="8" badge="" color="#1d4ed8" />
      <StatCard icon={<Truck />} label="Active" value="4" badge="+1" badgeUp color="#15803d" />
      <StatCard icon={<Truck />} label="In Maintenance" value="1" badge="" color="#ea580c" />
      <StatCard icon={<Truck />} label="Idle" value="2" badge="" color="#6b7280" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {FLEET.map((v, i) => (
        <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: 12, border: "0.5px solid #e5e3dc", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>{v.plate}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{v.type}</div>
            </div>
            <StatusBadge status={v.status} />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
              <UserIcon size={12} color="#aaa" /> {v.driver}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
              <MapPin size={12} color="#aaa" /> {v.loc}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
              <RefreshCw size={12} color="#aaa" /> 12 trips this month
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 6 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Fuel size={11} color="#888" /> Fuel Level</span>
              <span style={{ color: v.fuel > 50 ? "#15803d" : v.fuel > 25 ? "#ea580c" : "#b91c1c" }}>{v.fuel}%</span>
            </div>
            <div style={{ height: 6, backgroundColor: "#f0ede6", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${v.fuel}%`, backgroundColor: v.fuel > 50 ? "#15803d" : v.fuel > 25 ? "#ea580c" : "#dc2626", borderRadius: 3 }} />
            </div>
          </div>

          <button style={{ width: "100%", background: "#f7f6f2", border: "0.5px solid #e0ddd7", borderRadius: 8, fontSize: 12, fontWeight: 600, padding: "8px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#111", marginTop: "auto" }}>
            <Eye size={13} /> View Details
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Tracking = () => {
  const [activeId, setActiveId] = useState(TRACKING_SHIPMENTS[0].id);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "0.01em", margin: "0 0 4px 0" }}>LIVE TRACKING</h1>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Real-time vehicle and shipment location monitoring.</p>
      </div>

      <div style={{ display: "flex", height: 500, gap: 16 }}>
        <div style={{ flex: 1, backgroundColor: "#0f172a", borderRadius: 12, border: "0.5px solid #1e293b", position: "relative", overflow: "hidden" }}>
          <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.15 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {TRACKING_SHIPMENTS.map(s => {
               const isActive = s.id === activeId;
               return (
                 <line key={`line-${s.id}`} x1={`${s.x}%`} y1={`${s.y}%`} x2={`${s.x + 10}%`} y2={`${s.y - 8}%`} stroke={isActive ? "#3b82f6" : "#334155"} strokeWidth={isActive ? 2 : 1} strokeDasharray={isActive ? "5,4" : "none"} />
               );
            })}
          </svg>
          
          {TRACKING_SHIPMENTS.map(s => {
            const isActive = s.id === activeId;
            return (
              <div key={s.id} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)", zIndex: isActive ? 10 : 1 }}>
                {isActive && (
                  <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8, backgroundColor: "#3b82f6", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap" }}>
                    {s.id}
                  </div>
                )}
                <div style={{ width: isActive ? 18 : 12, height: isActive ? 18 : 12, backgroundColor: isActive ? "#3b82f6" : "#475569", borderRadius: "50%", border: isActive ? "3px solid #93c5fd" : "2px solid #64748b", boxShadow: isActive ? "0 0 0 6px rgba(59,130,246,0.2)" : "none", transition: "all 0.3s" }} />
              </div>
            )
          })}
          
          <div style={{ position: "absolute", bottom: 16, left: 16, backgroundColor: "rgba(15,23,42,0.8)", padding: "12px 16px", borderRadius: 8, border: "0.5px solid #334155" }}>
             {TRACKING_SHIPMENTS.map(s => (
               <div key={`leg-${s.id}`} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 11, color: "#cbd5e1" }}>
                 <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: s.id === activeId ? "#3b82f6" : "#475569" }} /> {s.id}
               </div>
             ))}
          </div>
        </div>

        <div style={{ width: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {TRACKING_SHIPMENTS.map(s => {
            const isActive = s.id === activeId;
            return (
              <div key={s.id} onClick={() => setActiveId(s.id)} style={{ backgroundColor: isActive ? "#eff6ff" : "#fff", border: isActive ? "1.5px solid #3b82f6" : "0.5px solid #e5e3dc", borderRadius: 10, padding: 14, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>{s.id}</span>
                  <StatusBadge status="IN TRANSIT" />
                </div>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 10 }}>{s.company}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#111", fontWeight: 600, marginBottom: 12 }}>
                  <Navigation size={11} color="#888" /> {s.route}
                </div>
                <div style={{ height: 4, backgroundColor: isActive ? "#bfdbfe" : "#f0ede6", borderRadius: 2, marginBottom: 10 }}>
                   <div style={{ height: "100%", width: `${s.prog}%`, backgroundColor: "#3b82f6", borderRadius: 2 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" }}>
                  <span>ETA: <strong style={{ color: "#111" }}>{s.eta}</strong></span>
                  <span>Driver: {s.driver}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const Analytics = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "0.01em", margin: "0 0 4px 0" }}>ANALYTICS & REPORTS</h1>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Performance metrics and business intelligence.</p>
      </div>
      <div style={{ display: "flex" }}>
         {['7 days', '30 days', '90 days'].map((t, i) => (
           <button key={t} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, backgroundColor: i === 0 ? "#111" : "#fff", color: i === 0 ? "#fff" : "#555", border: "0.5px solid #ddd", cursor: "pointer", borderRadius: i===0 ? "6px 0 0 6px" : i===2 ? "0 6px 6px 0" : 0 }}>{t}</button>
         ))}
      </div>
    </div>

    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      <StatCard icon={<TrendingUp />} label="Revenue" value="$48.2k" badge="+18%" badgeUp color="#15803d" />
      <StatCard icon={<CheckCircle2 />} label="Completed" value="312" badge="+22%" badgeUp color="#1d4ed8" />
      <StatCard icon={<Clock />} label="Avg. Delivery" value="14.2 hrs" badge="-8%" badgeUp={false} color="#ea580c" />
      <StatCard icon={<Zap />} label="Satisfaction" value="96.4%" badge="+2%" badgeUp color="#7c3aed" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "0.5px solid #e5e3dc", padding: 20 }}>
         <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 4px 0", color: "#111" }}>Weekly Revenue</h2>
         <p style={{ fontSize: 12, color: "#888", margin: "0 0 24px 0" }}>Revenue breakdown by day this week.</p>
         <div style={{ height: 160, display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 10px" }}>
           {WEEKLY_REVENUE.map(d => (
             <div key={d.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
               <span style={{ fontSize: 10, color: "#888" }}>${d.val/1000}k</span>
               <div style={{ width: "60%", maxWidth: 30, height: `${(d.val/12000)*100}%`, backgroundColor: "#dbeafe", borderRadius: "4px 4px 0 0", position: "relative" }}>
                 <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", backgroundColor: "#1d4ed8", borderRadius: "4px 4px 0 0" }} />
               </div>
               <span style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>{d.day}</span>
             </div>
           ))}
         </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "0.5px solid #e5e3dc", padding: 20 }}>
         <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 16px 0", color: "#111" }}>Top Routes by Volume</h2>
         <table style={{ borderCollapse: "collapse", width: "100%" }}>
           <thead>
             <tr>
               <th style={{ padding: "8px 0", fontSize: 10, color: "#888", textAlign: "left", textTransform: "uppercase" }}>Route</th>
               <th style={{ padding: "8px 0", fontSize: 10, color: "#888", textAlign: "right", textTransform: "uppercase" }}>Shipments</th>
               <th style={{ padding: "8px 0", fontSize: 10, color: "#888", textAlign: "right", textTransform: "uppercase" }}>Revenue</th>
               <th style={{ padding: "8px 0", fontSize: 10, color: "#888", textAlign: "right", textTransform: "uppercase" }}>Avg Time</th>
             </tr>
           </thead>
           <tbody>
             {TOP_ROUTES.map((r, i) => (
               <tr key={i} style={{ borderBottom: "0.5px solid #f7f5f0" }}>
                 <td style={{ padding: "10px 0", fontSize: 12, fontWeight: 700, color: "#111" }}>{r.route.split('→').map((p,idx)=><React.Fragment key={idx}>{idx>0 && <span style={{color:"#bbb", margin:"0 2px"}}>→</span>}{p.trim()}</React.Fragment>)}</td>
                 <td style={{ padding: "10px 0", fontSize: 12, textAlign: "right", color: "#555" }}>{r.vol}</td>
                 <td style={{ padding: "10px 0", fontSize: 12, textAlign: "right", fontWeight: 700, color: "#15803d" }}>{r.rev}</td>
                 <td style={{ padding: "10px 0", fontSize: 12, textAlign: "right", color: "#555" }}>{r.time}</td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {[{ l: "Most Profitable Route", v1: "Mumbai → Delhi", v2: "$12,400 this month", c: "#1d4ed8" }, { l: "Highest Volume Day", v1: "Friday", v2: "Avg 28 shipments/day", c: "#15803d" }, { l: "Fleet Utilization", v1: "72.5%", v2: "4 of 8 vehicles active", c: "#7c3aed" }].map((s, i) => (
         <div key={i} style={{ backgroundColor: "#fff", borderRadius: 12, border: "0.5px solid #e5e3dc", padding: "16px 20px" }}>
           <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 8 }}>{s.l}</div>
           <div style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 4 }}>{s.v1}</div>
           <div style={{ fontSize: 13, fontWeight: 600, color: s.c }}>{s.v2}</div>
         </div>
      ))}
    </div>
  </div>
);

const SettingsPage = () => {
  const [tab, setTab] = useState('profile');
  
  const navs = [
    { id: 'profile', icon: <UserIcon size={14} />, label: 'Profile' },
    { id: 'notifications', icon: <Bell size={14} />, label: 'Notifications' },
    { id: 'security', icon: <Shield size={14} />, label: 'Security' },
    { id: 'billing', icon: <CreditCard size={14} />, label: 'Billing' },
    { id: 'integrations', icon: <Link2 size={14} />, label: 'Integrations' }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "0.01em", margin: "0 0 4px 0" }}>SETTINGS</h1>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Manage your account, preferences and integrations.</p>
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ width: 180, backgroundColor: "#fff", border: "0.5px solid #e5e3dc", borderRadius: 12, padding: 8, alignSelf: "flex-start" }}>
          {navs.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "none", backgroundColor: tab === n.id ? "#f0f4ff" : "transparent", color: tab === n.id ? "#1d4ed8" : "#555", fontWeight: tab === n.id ? 700 : 500, fontSize: 13, borderRadius: 8, cursor: "pointer", textAlign: "left" }}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, backgroundColor: "#fff", border: "0.5px solid #e5e3dc", borderRadius: 12, padding: 32 }}>
          {tab === 'profile' && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <div style={{ width: 56, height: 56, backgroundColor: "#1d4ed8", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>JD</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>John Doe</div>
                  <div style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>Operations Manager</div>
                  <a href="#" style={{ fontSize: 12, color: "#1d4ed8", textDecoration: "none", fontWeight: 600 }}>Change Avatar</a>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email Address" placeholder="john.doe@example.com" type="email" />
                <Input label="Phone Number" placeholder="+1 (555) 123-4567" type="tel" />
                <Input label="Company" placeholder="Acme Logistics Inc." />
                <Input label="Role" as="select" options={['Operations Manager', 'Admin', 'Dispatcher', 'Driver']} />
                <Input label="Timezone" as="select" options={['UTC-5 (Eastern Time)', 'UTC-8 (Pacific Time)', 'UTC+0 (GMT)', 'UTC+5:30 (IST)']} />
              </div>
              <div style={{ marginTop: 24 }}>
                <button style={{ backgroundColor: "#111", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 20 }}>Notification Preferences</h2>
              {[
                { title: 'Email Alerts', desc: 'Receive daily summary and critical alerts via email', on: true },
                { title: 'SMS Alerts', desc: 'Get text messages for urgent shipment updates', on: false },
                { title: 'Push Notifications', desc: 'Receive in-app push notifications for all activities', on: true },
                { title: 'Weekly Reports', desc: 'Receive an automated weekly performance report', on: true },
                { title: 'System Alerts', desc: 'Alerts regarding system maintenance and updates', on: true },
                { title: 'Driver Updates', desc: 'Real-time notifications when a driver status changes', on: false },
              ].map((n, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "0.5px solid #f0ede6" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{n.desc}</div>
                  </div>
                  <Toggle defaultOn={n.on} />
                </div>
              ))}
            </div>
          )}

          {tab === 'security' && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 20 }}>Change Password</h2>
              <div style={{ maxWidth: 400 }}>
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm Password" type="password" placeholder="••••••••" />
                <button style={{ backgroundColor: "#111", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Update Password</button>
              </div>
              <hr style={{ border: "none", borderTop: "0.5px solid #e5e3dc", margin: "32px 0" }} />
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 8 }}>Two-Factor Authentication</h2>
              <p style={{ fontSize: 13, color: "#555", marginBottom: 20 }}>Add an extra layer of security to your account.</p>
              <div style={{ display: "flex", gap: 16 }}>
                 <div style={{ flex: 1, backgroundColor: "#f7f6f2", padding: 16, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                     <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Authenticator App</div>
                     <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Not configured</div>
                   </div>
                   <Toggle defaultOn={false} />
                 </div>
                 <div style={{ flex: 1, backgroundColor: "#f7f6f2", padding: 16, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                     <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>SMS Verification</div>
                     <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Ending in **67</div>
                   </div>
                   <Toggle defaultOn={true} />
                 </div>
              </div>
            </div>
          )}

          {tab === 'billing' && (
            <div>
              <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                   <div style={{ fontSize: 18, fontWeight: 800, color: "#1d4ed8", marginBottom: 4 }}>Pro Plan</div>
                   <div style={{ fontSize: 13, color: "#1e3a8a" }}>Advanced routing, live tracking & priority support.</div>
                </div>
                <div style={{ textAlign: "right" }}>
                   <div style={{ fontSize: 24, fontWeight: 800, color: "#111" }}>$149<span style={{ fontSize: 14, color: "#555", fontWeight: 600 }}>/mo</span></div>
                </div>
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 16 }}>Payment Method</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e5e3dc", padding: 16, borderRadius: 10, marginBottom: 16 }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                   <div style={{ backgroundColor: "#1a1f36", color: "#fff", width: 48, height: 32, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, fontStyle: "italic" }}>VISA</div>
                   <div>
                     <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Visa ending in 4242</div>
                     <div style={{ fontSize: 12, color: "#888" }}>Expires 08/2028</div>
                   </div>
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                   <span style={{ backgroundColor: "#dcfce7", color: "#15803d", fontSize: 10, fontWeight: 800, padding: "4px 8px", borderRadius: 6, letterSpacing: "0.05em" }}>DEFAULT</span>
                 </div>
              </div>
              <button style={{ backgroundColor: "#fff", color: "#111", border: "1px solid #ddd", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Add Payment Method</button>
            </div>
          )}

          {tab === 'integrations' && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 20 }}>Integrations</h2>
              {[
                { e: '🗺️', n: 'Google Maps', d: 'Advanced routing and geocoding', c: true },
                { e: '💳', n: 'Stripe', d: 'Secure payment processing', c: true },
                { e: '📱', n: 'Twilio', d: 'SMS notifications for drivers', c: false },
                { e: '💬', n: 'Slack', d: 'Team communication alerts', c: true },
                { e: '📊', n: 'QuickBooks', d: 'Accounting and invoicing', c: false },
                { e: '☁️', n: 'Salesforce', d: 'CRM and customer data sync', c: false },
              ].map((ig, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "0.5px solid #f0ede6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 24 }}>{ig.e}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{ig.n}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{ig.d}</div>
                    </div>
                  </div>
                  <button style={{ backgroundColor: ig.c ? "#dcfce7" : "#fff", color: ig.c ? "#15803d" : "#111", border: ig.c ? "none" : "1px solid #ddd", padding: "6px 16px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    {ig.c && <CheckCircle2 size={12} />} {ig.c ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PAGES = {
  dashboard: <Dashboard />,
  bookings: <Bookings />,
  fleet: <Fleet />,
  tracking: <Tracking />,
  analytics: <Analytics />,
  settings: <SettingsPage />
};

export default function CargoFlowSingle() {
  const [page, setPage] = useState('dashboard');
  
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", backgroundColor: "#f5f4f0", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        input, select, button { font-family: inherit; }
      `}</style>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <div style={{ flex: 1, overflow: "auto", padding: "24px 24px 32px" }}>
          {PAGES[page] ? React.cloneElement(PAGES[page]) : null}
        </div>
      </div>
    </div>
  );
}
