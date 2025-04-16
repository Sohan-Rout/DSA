'use client';
import React from 'react';

const GoButton = ({ onGo, isAnimating }) => {
  return (
    <button
      type="submit"
      onClick={onGo}
      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50 transition-colors"
      disabled={isAnimating}
    >
      Go
    </button>
  );
};

export default GoButton;