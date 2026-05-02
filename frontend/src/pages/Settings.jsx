import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Blocks } from 'lucide-react';

// --- Shared input style ---
const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: '#f9f9f7',
  border: '1px solid #e2e2e2',
  borderRadius: 7,
  fontSize: 12,
  color: '#111',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: 10,
  color: '#aaa',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 5,
  fontWeight: 500,
};

const sectionTitle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#111',
  marginBottom: 14,
};

// --- Toggle component ---
const Toggle = ({ defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div
      onClick={() => setOn(!on)}
      style={{
        width: 40, height: 22, borderRadius: 11, cursor: 'pointer',
        backgroundColor: on ? '#111' : '#e0e0e0',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff',
        position: 'absolute', top: 3, left: on ? 21 : 3,
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }} />
    </div>
  );
};

// --- NAV ITEMS ---
const NAV = [
  { id: 'profile',       label: 'Profile',       icon: <User size={14} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={14} /> },
  { id: 'security',      label: 'Security',       icon: <Shield size={14} /> },
  { id: 'billing',       label: 'Billing',        icon: <CreditCard size={14} /> },
  { id: 'integrations',  label: 'Integrations',   icon: <Blocks size={14} /> },
];

// --- SECTION CONTENT ---

const ProfileSection = () => (
  <div>
    <div style={sectionTitle}>Profile</div>

    {/* Avatar row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #f0f0ec', marginBottom: 20 }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, flexShrink: 0 }}>
        JD
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>John Doe</div>
        <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>Operations Manager</div>
        <button style={{ marginTop: 6, fontSize: 11, color: '#1a73e8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Change avatar</button>
      </div>
    </div>

    {/* Form grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', marginBottom: 20 }}>
      {[
        { label: 'Full Name',      def: 'John Doe',             type: 'text'  },
        { label: 'Email Address',  def: 'john.doe@example.com', type: 'email' },
        { label: 'Phone Number',   def: '+1 (555) 123-4567',    type: 'tel'   },
        { label: 'Company',        def: 'Acme Logistics Inc.',   type: 'text'  },
      ].map((f, i) => (
        <div key={i}>
          <label style={labelStyle}>{f.label}</label>
          <input type={f.type} defaultValue={f.def} style={inputStyle} />
        </div>
      ))}
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>Role</label>
        <input type="text" defaultValue="Operations Manager" disabled style={{ ...inputStyle, backgroundColor: '#f0f0ec', color: '#aaa', cursor: 'not-allowed' }} />
      </div>
    </div>

    <button style={{ padding: '8px 20px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
      Save Changes
    </button>
  </div>
);

const NotificationsSection = () => {
  const items = [
    { label: 'Email Alerts',       desc: 'Receive daily summary and critical alerts via email', on: true  },
    { label: 'SMS Alerts',         desc: 'Get text messages for urgent shipment updates',        on: false },
    { label: 'Push Notifications', desc: 'In-app notifications for all activities',              on: true  },
    { label: 'Weekly Reports',     desc: 'Automated weekly performance report',                  on: true  },
    { label: 'System Alerts',      desc: 'Maintenance windows and system downtime notices',      on: true  },
    { label: 'Driver Updates',     desc: 'Notify when a driver completes or starts a trip',     on: false },
  ];
  return (
    <div>
      <div style={sectionTitle}>Notification Preferences</div>
      {items.map((n, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < items.length - 1 ? '1px solid #f5f5f0' : 'none' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#111' }}>{n.label}</div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{n.desc}</div>
          </div>
          <Toggle defaultOn={n.on} />
        </div>
      ))}
    </div>
  );
};

const SecuritySection = () => (
  <div>
    <div style={sectionTitle}>Security</div>

    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#555', marginBottom: 12 }}>Change Password</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
        {['Current Password', 'New Password', 'Confirm New Password'].map((l, i) => (
          <div key={i}>
            <label style={labelStyle}>{l}</label>
            <input type="password" placeholder="••••••••" style={inputStyle} />
          </div>
        ))}
        <div>
          <button style={{ padding: '8px 20px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
            Update Password
          </button>
        </div>
      </div>
    </div>

    <div style={{ borderTop: '1px solid #f0f0ec', paddingTop: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#555', marginBottom: 12 }}>Two-Factor Authentication</div>
      {[
        { label: 'Authenticator App', desc: 'Use an authenticator app to generate one-time codes', on: false },
        { label: 'SMS Verification',  desc: 'Receive a verification code via text message',         on: true  },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f7', border: '1px solid #e8e8e4', borderRadius: 8, padding: '12px 16px', marginBottom: i === 0 ? 10 : 0 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#111' }}>{item.label}</div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{item.desc}</div>
          </div>
          <Toggle defaultOn={item.on} />
        </div>
      ))}
    </div>
  </div>
);

const BillingSection = () => (
  <div>
    <div style={sectionTitle}>Billing & Plan</div>

    {/* Plan Banner */}
    <div style={{ backgroundColor: '#f0f5ff', border: '1px solid #c7d7fd', borderRadius: 10, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <div style={{ fontSize: 10, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>Pro Plan</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>Advanced Logistics</div>
        <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>Real-time tracking · Advanced analytics · Priority support</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 24, fontWeight: 500, color: '#111' }}>$149<span style={{ fontSize: 12, color: '#aaa', fontWeight: 400 }}>/mo</span></div>
        <button style={{ marginTop: 8, padding: '6px 14px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: 7, fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>
          Manage Plan
        </button>
      </div>
    </div>

    {/* Payment Method */}
    <div style={{ fontSize: 12, fontWeight: 500, color: '#555', marginBottom: 12 }}>Payment Methods</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e8e8e4', borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 28, backgroundColor: '#1a1f36', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, fontStyle: 'italic', letterSpacing: 1 }}>
          VISA
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#111' }}>Visa ending in 4242</div>
          <div style={{ fontSize: 10, color: '#aaa', marginTop: 1 }}>Expires 08/2028</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default</span>
        <button style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
      </div>
    </div>
    <button style={{ padding: '8px 16px', backgroundColor: '#fff', color: '#555', border: '1px solid #e8e8e4', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
      <CreditCard size={13} /> Add Payment Method
    </button>
  </div>
);

const IntegrationsSection = () => {
  const items = [
    { emoji: '🗺️', name: 'Google Maps', desc: 'Advanced routing and geocoding',       connected: true  },
    { emoji: '💳', name: 'Stripe',       desc: 'Secure payment processing',           connected: true  },
    { emoji: '📱', name: 'Twilio',       desc: 'SMS notifications for drivers',       connected: false },
    { emoji: '💬', name: 'Slack',        desc: 'Team communication alerts',           connected: true  },
    { emoji: '📊', name: 'QuickBooks',   desc: 'Accounting and invoicing',            connected: false },
    { emoji: '☁️', name: 'Salesforce',   desc: 'CRM and customer data sync',         connected: false },
  ];
  return (
    <div>
      <div style={sectionTitle}>Connected Integrations</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < items.length - 1 ? '1px solid #f5f5f0' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 36, backgroundColor: '#f9f9f7', border: '1px solid #e8e8e4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {item.emoji}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#111' }}>{item.name}</div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{item.desc}</div>
            </div>
          </div>
          <button style={{
            padding: '5px 14px',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 7,
            cursor: 'pointer',
            backgroundColor: item.connected ? '#e8f5e9' : '#fff',
            color: item.connected ? '#2e7d32' : '#555',
            border: item.connected ? '1px solid #c3e6cb' : '1px solid #e8e8e4',
          }}>
            {item.connected ? '✓ Connected' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const sections = {
    profile:       <ProfileSection />,
    notifications: <NotificationsSection />,
    security:      <SecuritySection />,
    billing:       <BillingSection />,
    integrations:  <IntegrationsSection />,
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f5f5f0', minHeight: '100%', fontFamily: 'system-ui, sans-serif' }}>

      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111', margin: '0 0 4px 0' }}>Settings</h1>
        <p style={{ fontSize: 11, color: '#999', margin: 0 }}>Manage your account preferences and system configuration</p>
      </div>

      {/* Layout */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

        {/* Left Nav */}
        <div style={{ width: 180, flexShrink: 0, backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: 6, alignSelf: 'flex-start' }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 12px',
                border: 'none', borderRadius: 7, cursor: 'pointer',
                fontSize: 12, fontWeight: activeTab === n.id ? 600 : 400,
                backgroundColor: activeTab === n.id ? '#f0f0ec' : 'transparent',
                color: activeTab === n.id ? '#111' : '#777',
                textAlign: 'left', transition: 'all 0.15s',
              }}
              onMouseOver={e => { if (activeTab !== n.id) e.currentTarget.style.backgroundColor = '#f9f9f7'; }}
              onMouseOut={e => { if (activeTab !== n.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e8e8e4', borderRadius: 10, padding: '22px 24px', minHeight: 500 }}>
          {sections[activeTab]}
        </div>

      </div>
    </div>
  );
}
