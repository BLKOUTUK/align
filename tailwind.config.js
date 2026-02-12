/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bmhwa: {
          primary: '#1B1B3A',
          accent: '#E8A838',
          bg: '#FBF8F3',
        },
      },
    },
  },
  plugins: [],
};
