/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pluto: {
          navy: '#061F46',
          'navy-deep': '#051A3B',
          'navy-secondary': '#0A2D5B',
          'navy-surface': '#0D356B',
          gold: '#FFC400',
          'gold-bright': '#FFD233',
          'gold-dark': '#E0AC00',
          light: '#F6F9FF',
          'blue-soft': '#EAF2FF',
          ink: '#10264A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(6, 31, 70, 0.08)',
        'card-hover': '0 16px 40px rgba(6, 31, 70, 0.14)',
        header: '0 4px 20px rgba(6, 31, 70, 0.06)',
        gold: '0 8px 24px rgba(255, 196, 0, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease-out forwards',
        'fade-up': 'fadeUp 0.55s ease-out forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
