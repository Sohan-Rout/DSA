'use client';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthModal({ isOpen, showLogin, closeModal, switchToLogin, switchToSignup }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">X</button>
        {showLogin ? (
          <LoginForm onSwitchToSignup={switchToSignup} onClose={closeModal} />
        ) : (
          <SignupForm onSwitchToLogin={switchToLogin} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}