'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (email, password, name) => {
    try {
      const res = await axios.post(`${API}/auth/signup`, {
        email,
        password,
        name,
      });

      if (res.data.success) {
        setUser(res.data.user);
        return { success: true };
      }

      return { success: false, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        return { success: true };
      }

      return { success: false, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.user) setUser(res.data.user);
        } catch {
          localStorage.removeItem('token');
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);