import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import {
  LayoutDashboard, Truck, MapPin, BarChart3, Settings, LogOut,
  Package, Search, Bell, X, CheckCheck
} from 'lucide-react';

const NotifDot = ({ type }) => {
  const c = { alert: '#c62828', warning: '#e65100', success: '#2e7d32', info: '#1a73e8' }[type] || '#888';
  return <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c, flexShrink: 0, marginTop: 3 }} />;
};

const Layout = () => {
  const { logout, user } = useAuth();
  const { notifications, unreadCount, markAllRead } = useAppData();
  const navigate = useNavigate();
  const [showBell, setShowBell] = useState(false);
  const [search, setSearch] = useState('');
  const bellRef = useRef(null);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e) => { if (bellRef.current && !bellRef.current.contains(e.target)) setShowBell(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchKey = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      const q = search.toLowerCase();
      if (q.includes('fleet') || q.includes('vehicle') || q.includes('truck')) navigate('/fleet');
      else if (q.includes('book')) navigate('/bookings');
      else if (q.includes('track') || q.includes('gps') || q.includes('live')) navigate('/tracking');
      else if (q.includes('analytic') || q.includes('report') || q.includes('revenue')) navigate('/analytics');
      else if (q.includes('setting')) navigate('/settings');
      else navigate('/bookings');
      setSearch('');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* Sidebar */}
      <aside style={{ width: 200, backgroundColor: '#111', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={16} color="#111" />
          </div>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '0.06em' }}>CARGOFLOW</span>
        </div>

        {/* Navigation */}
        <div style={{ padding: '16px 0', flex: 1, overflow: 'auto' }}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { path: '/',         label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
              { path: '/bookings', label: 'Bookings',  icon: <Package size={14} /> },
              { path: '/fleet',    label: 'Fleet',     icon: <Truck size={14} /> },
              { path: '/tracking', label: 'Tracking',  icon: <MapPin size={14} /> },
            ].map(item => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <div className="link-content">{item.icon} {item.label}</div>
                <div className="active-dot" />
              </NavLink>
            ))}

            <div style={{ padding: '24px 16px 8px', fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Reports
            </div>

            {[
              { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={14} /> },
              { path: '/settings',  label: 'Settings',  icon: <Settings size={14} /> },
            ].map(item => (
              <NavLink key={item.path} to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <div className="link-content">{item.icon} {item.label}</div>
                <div className="active-dot" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Area */}
        <div style={{ padding: '16px', borderTop: '1px solid #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#222', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {user?.name?.[0] || 'J'}{user?.name?.split(' ')[1]?.[0] || 'D'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name || 'John Doe'}</div>
              <div style={{ color: '#555', fontSize: 10, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.email || 'john.doe@example.com'}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: 12, padding: 0, fontWeight: 500 }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, backgroundColor: '#f5f5f0' }}>

        {/* Top Bar */}
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e8e4', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'sticky', top: 0, zIndex: 100 }}>

          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <Search size={14} color="#bbb" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={handleSearch}
              onKeyDown={handleSearchKey}
              placeholder="Search shipments, vehicles... (Enter)"
              style={{ width: '100%', padding: '8px 12px 8px 32px', backgroundColor: '#f9f9f7', border: '1px solid #e2e2e2', borderRadius: 7, fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Bell with notification panel */}
            <div ref={bellRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowBell(v => !v); if (!showBell) markAllRead(); }}
                style={{ position: 'relative', backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center' }}>
                <Bell size={14} />
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, backgroundColor: '#c62828', borderRadius: '50%', border: '1.5px solid #fff' }} />
                )}
              </button>

              {/* Notification Dropdown */}
              {showBell && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 340, backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 999, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Notifications</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <CheckCheck size={12} /> Mark all read
                      </button>
                      <button onClick={() => setShowBell(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', display: 'flex' }}><X size={14} /></button>
                    </div>
                  </div>
                  <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: '#bbb', fontSize: 12 }}>No notifications</div>
                    ) : notifications.map(n => (
                      <div key={n.id} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: '1px solid #f5f5f0', backgroundColor: n.read ? 'transparent' : '#fafaf8' }}>
                        <NotifDot type={n.type} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: n.read ? 400 : 600, color: '#111', marginBottom: 2 }}>{n.title}</div>
                          <div style={{ fontSize: 11, color: '#888', marginBottom: 3 }}>{n.desc}</div>
                          <div style={{ fontSize: 10, color: '#bbb' }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
