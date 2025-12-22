/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-olive': '#2B2B0B',
        'neon-yellow': '#D6E56E',
        'amber-glow': '#FFB400',
        'terminal-bg': '#000000',
        'cyan-glow': '#00D9FF',
        'orange-glow': '#FF6B35',
        'olive-glow': '#6B8E23',
      },
      fontFamily: {
        'neuropol': ['NeuropolX', 'sans-serif'],
        'terminal': ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
