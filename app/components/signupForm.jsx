'use client';
import { useState } from 'react';
import API from '@/utils/api';

export default function SignupForm({ onSwitchToLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', { name, email, password });
      if (res.data.success) {
        onClose();
      } else {
        setError(res.data.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="text" placeholder="Name" className="w-full p-2" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" className="w-full p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      <p>
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-blue-600 underline">Login</button>
      </p>
    </form>
  );
}