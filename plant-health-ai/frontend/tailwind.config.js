/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          700: '#15803d',
          900: '#14532d',
        },
        terracotta: {
          50: '#fcf6f4',
          100: '#f6e9e4',
          200: '#edd2c8',
          500: '#cc6a4b',
          600: '#ba5031',
          800: '#953e28',
          900: '#793523',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          500: '#7b9d7b',
          600: '#608160',
          800: '#405640',
        },
        cream: {
          50: '#faf9f6',
          100: '#f5f5f0',
          200: '#e8e6da',
        }
      }
    },
  },
  plugins: [],
}
