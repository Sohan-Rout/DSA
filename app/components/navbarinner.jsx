'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/app/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useUser();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <nav className="bg-white dark:bg-black text-black dark:text-white p-4 flex justify-between">
        <Link href="/" className="font-bold text-xl">DSAVisualizer</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span>{user.name}</span>
              <button onClick={logout} className="text-red-500">Logout</button>
            </>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Login / Signup</button>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        showLogin={showLogin}
        closeModal={() => setAuthModalOpen(false)}
        switchToLogin={() => setShowLogin(true)}
        switchToSignup={() => setShowLogin(false)}
      />
    </>
  );
}