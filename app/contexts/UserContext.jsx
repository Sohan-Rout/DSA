"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 
        'Authorization': `Bearer ${token}` 
      } : {};

      const res = await fetch(`${API_BASE_URL}/api/me`, {
        credentials: "include",
        headers
      });
      
      const data = await res.json();
      
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        // Clear invalid token
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (err) {
      console.error("User fetch error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading,
      refetchUser: fetchUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);