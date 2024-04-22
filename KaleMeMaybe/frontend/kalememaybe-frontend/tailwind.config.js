/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': '#97c279',
        'green-light': '#eef7d6',
      },
      screens:{
        's':'925px',
        'list-s':'900px',
        'list-m':'1000px',
        'list-l':'1200px',
        'm':'1350px'
      }
    },
  },
  plugins: [],
};
