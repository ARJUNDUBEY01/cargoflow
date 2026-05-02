import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, Package, Truck, MapPin, BarChart2, CheckCircle } from 'lucide-react';

const Auth = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = isLogin
      ? await login(formData.email, formData.password)
      : await signup(formData.name, formData.email, formData.password);
    if (success) navigate('/');
    setIsSubmitting(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px 10px 36px',
    backgroundColor: '#f9f9f7',
    border: '1px solid #e2e2e2',
    borderRadius: 8,
    fontSize: 13,
    color: '#111',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    color: '#777',
    marginBottom: 6,
    fontWeight: 500,
  };

  const features = [
    { icon: <Truck size={15} />,    text: 'Real-time fleet tracking' },
    { icon: <MapPin size={15} />,   text: 'Live GPS shipment monitoring' },
    { icon: <BarChart2 size={15} />,text: 'Advanced analytics & reports' },
    { icon: <Package size={15} />,  text: 'Seamless booking management' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f5f5f0' }}>

      {/* ── LEFT PANEL ── */}
      <div style={{
        width: 440,
        flexShrink: 0,
        backgroundColor: '#111',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 44px',
      }}>
        {/* Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={17} color="#111" />
            </div>
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: '0.08em' }}>CARGOFLOW</span>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 500, color: '#fff', lineHeight: 1.3, margin: '0 0 12px 0' }}>
              Logistics,<br />reimagined.
            </h2>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 }}>
              Manage your entire supply chain from a single, intelligent platform.
            </p>
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, backgroundColor: '#1a1a1a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <span style={{ fontSize: 13, color: '#888' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #1e1e1e', paddingTop: 32 }}>
          {[
            { val: '12k+',  label: 'Shipments' },
            { val: '98%',   label: 'On-time' },
            { val: '340+',  label: 'Clients' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, borderRight: i < 2 ? '1px solid #1e1e1e' : 'none', paddingRight: 20, paddingLeft: i > 0 ? 20 : 0 }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Tab switcher */}
          <div style={{ display: 'flex', backgroundColor: '#f0f0ec', borderRadius: 9, padding: 3, marginBottom: 32 }}>
            {['Sign In', 'Sign Up'].map((t, i) => {
              const active = (i === 0) === isLogin;
              return (
                <button
                  key={t}
                  onClick={() => setIsLogin(i === 0)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    border: 'none',
                    borderRadius: 7,
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    color: active ? '#111' : '#999',
                    backgroundColor: active ? '#fff' : 'transparent',
                    cursor: 'pointer',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: '#111', margin: '0 0 6px 0' }}>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p style={{ fontSize: 12, color: '#999', margin: 0 }}>
              {isLogin
                ? 'Sign in to access your logistics dashboard'
                : 'Get started with CargoFlow — free to try'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>

              {/* Name — signup only */}
              {!isLogin && (
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={14} color="#bbb" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text" name="name" required={!isLogin}
                      value={formData.name} onChange={handleChange}
                      placeholder="John Doe"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#111'}
                      onBlur={e => e.target.style.borderColor = '#e2e2e2'}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={14} color="#bbb" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    placeholder="name@company.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#111'}
                    onBlur={e => e.target.style.borderColor = '#e2e2e2'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                  {isLogin && (
                    <button type="button" style={{ fontSize: 11, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} color="#bbb" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password" name="password" required
                    value={formData.password} onChange={handleChange}
                    placeholder="••••••••"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#111'}
                    onBlur={e => e.target.style.borderColor = '#e2e2e2'}
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: '10px 14px', backgroundColor: '#fce4e4', border: '1px solid #f5c6c6', borderRadius: 8, color: '#c62828', fontSize: 12, marginBottom: 16 }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '11px 0',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              {isSubmitting
                ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
                : <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={15} /></>
              }
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, backgroundColor: '#e8e8e4' }} />
            <span style={{ fontSize: 11, color: '#bbb' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, backgroundColor: '#e8e8e4' }} />
          </div>

          {/* Demo credentials hint */}
          <div style={{ backgroundColor: '#f9f9f7', border: '1px solid #e8e8e4', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <CheckCircle size={13} color="#2e7d32" />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>Demo credentials</span>
            </div>
            <div style={{ fontSize: 11, color: '#888', lineHeight: 1.7 }}>
              Email: <span style={{ fontFamily: 'monospace', color: '#111' }}>john.doe@example.com</span><br />
              Password: <span style={{ fontFamily: 'monospace', color: '#111' }}>Password123!</span>
            </div>
          </div>

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 28 }}>
            © 2026 CargoFlow Systems. All rights reserved.
          </p>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Auth;
