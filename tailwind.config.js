/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        rose: {
          blush: '#FDF0F0',
          soft: '#F9E4E4',
          muted: '#E8C4C4',
          accent: '#C9797D',
          deep: '#A0484C',
        },
        cream: '#FEFAF6',
        parchment: '#F7F2EB',
        ink: '#2C1810',
        inkLight: '#5C3D35',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'petal': 'petal 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        petal: {
          '0%, 100%': { transform: 'rotate(-5deg) translateY(0)' },
          '50%': { transform: 'rotate(5deg) translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
