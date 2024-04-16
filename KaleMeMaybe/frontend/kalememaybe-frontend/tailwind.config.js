/** @type {import('tailwindcss').Config} */
export default {
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
    },
  },
  plugins: [],
}
