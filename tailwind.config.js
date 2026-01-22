/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Skroller-inspired color palette
        magenta: '#FF00FF', // Primary magenta from skroller.com
        'magenta-light': '#FF66FF',
        'magenta-dark': '#CC00CC',
        blue: '#00BFFF', // Teal/cyan from skroller.com
        'blue-light': '#40D9FF',
        'blue-dark': '#0099CC',
        teal: '#00CED1', // Additional teal accent
        purple: '#8B00FF', // Purple gradient accent
        dark: '#0A0A0A',
        'dark-light': '#1A1A1A',
        'dark-lighter': '#2A2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
