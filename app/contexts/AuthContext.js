'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Use absolute backend URL (e.g., https://your-backend.com or http://localhost:3001)
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user data from /api/me using token
  const fetchUser = async () => {
    try {
      const url = `${BASE_API_URL}/api/me`;
      console.log('AuthContext: Fetching user from', url);
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // Send cookies with request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        console.log('AuthContext: User fetched', user);
      } else {
        console.error('AuthContext: Failed to fetch user', response.status, await response.text());
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
      const url = `${BASE_API_URL}/api/login`;
      console.log('AuthContext: Logging in to', url);
      const response = await fetch(url, {
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
        console.error('AuthContext: Login failed', message);
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
      const url = `${BASE_API_URL}/api/signup`;
      console.log('AuthContext: Signing up to', url);
      const response = await fetch(url, {
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
        console.error('AuthContext: Signup failed', message);
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
      console.log('AuthContext: Logged out');
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