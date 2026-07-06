/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"bc_empire_windrushregular"', '"Arial Black"', 'Impact', 'sans-serif'],
        body: ['"Work Sans"', 'system-ui', 'sans-serif'],
        data: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // BMHWA Round 2 tokens (see manifesto docs/round-2/03_design-system.md)
        bmhwa: {
          primary: '#2B211C', // brown-black
          accent: '#D89A2D',  // ochre — dark surfaces / fills only
          urgent: '#C8341F',  // demand red — emphasis on light
          bg: '#F6F2EA',      // warm off-white
          muted: '#6F635A',   // warm grey-brown
        },
      },
    },
  },
  plugins: [],
};
