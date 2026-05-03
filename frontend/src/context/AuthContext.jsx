import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      if (user) {
        user.name = user.user_metadata?.full_name || user.email?.split('@')[0];
        localStorage.setItem('token', session.access_token);
      }
      setUser(user);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      if (user) {
        user.name = user.user_metadata?.full_name || user.email?.split('@')[0];
        localStorage.setItem('token', session.access_token);
      } else {
        localStorage.removeItem('token');
      }
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      if (data.session) {
        localStorage.setItem('token', data.session.access_token);
      }
      return true;
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      
      if (data.session) {
        localStorage.setItem('token', data.session.access_token);
      }
      return true;
    } catch (err) {
      setError(err.message || 'Signup failed');
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
