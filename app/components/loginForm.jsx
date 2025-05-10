'use client';
import { useState } from 'react';
import API from '@/utils/api';

export default function LoginForm({ onSwitchToSignup, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        onClose();
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" className="w-full p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      <p>
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToSignup} className="text-blue-600 underline">Sign up</button>
      </p>
    </form>
  );
}