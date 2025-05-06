'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Replace with your deployed backend URL (e.g., https://your-backend.com)
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user data from /api/me using token
  const fetchUser = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/me`, {
        method: 'GET',
        credentials: 'include', // Send cookies with request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('AuthContext: Error fetching user', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check user on mount and on navigation
  useEffect(() => {
    fetchUser();
  }, []);

  // Login function: Call /api/login and set user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include', // Include cookies for token
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        await fetchUser(); // Fetch user data after login
        return { success: true };
      } else {
        const { message } = await response.json();
        return { success: false, message };
      }
    } catch (error) {
      console.error('AuthContext: Login error', error);
      return { success: false, message: 'Login failed' };
    }
  };

  // Signup function
  const signup = async (email, password, name) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/signup`, {
        method: 'POST',
        credentials: 'include', // Include cookies for token
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        await fetchUser(); // Fetch user data after signup
        return { success: true };
      } else {
        const { message } = await response.json();
        return { success: false, message };
      }
    } catch (error) {
      console.error('AuthContext: Signup error', error);
      return { success: false, message: 'Signup failed' };
    }
  };

  // Logout function: Clear user and token
  const logout = async () => {
    try {
      setUser(null);
      // Clear token cookie by setting an expired cookie
      document.cookie = 'token=; Max-Age=0; path=/;';
      router.push('/');
    } catch (error) {
      console.error('AuthContext: Logout error', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
}