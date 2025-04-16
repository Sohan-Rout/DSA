import React from 'react';

const ResetButton = ({ onReset, isAnimating }) => {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={isAnimating}
      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg disabled:opacity-50 transition-colors"
    >
      Reset
    </button>
  );
};

export default ResetButton;