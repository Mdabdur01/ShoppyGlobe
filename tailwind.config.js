import { disable } from 'colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',     // Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',             // Chrome, Safari, Opera
        }
      })
    }
  ],
}

