"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/me`, {
        credentials: 'include', // This is crucial
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await res.json();
      console.log('User fetch response:', data); // Add this for debugging
      
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
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