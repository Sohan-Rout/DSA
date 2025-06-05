/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  function ({ addUtilities }) {
    addUtilities({
      '.perspective-1000': {
        perspective: '1000px',
      },
      '.backface-hidden': {
        'backface-visibility': 'hidden',
      },
      '.rotate-y-180': {
        transform: 'rotateY(180deg)',
      },
      '.transform-style-3d': {
        'transform-style': 'preserve-3d',
      },
    });
  },
  plugins: [require("@tailwindcss/typography")],
};