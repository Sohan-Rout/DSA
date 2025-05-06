'use client';
import { useState } from 'react';
import { useUser } from '@/app/contexts/AuthContext';

export default function SignupForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signup } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(email, password, name);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-black dark:text-white">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
}