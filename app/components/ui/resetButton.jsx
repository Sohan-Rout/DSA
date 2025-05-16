import React from 'react';

const ResetButton = ({ onReset, isAnimating }) => {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={isAnimating}
      className="flex-1 bg-transparent border border-black text-black dark:border-gray-500 dark:text-white py-3 rounded-lg disabled:opacity-50 transition-colors"
    >
      Reset
    </button>
  );
};

export default ResetButton;