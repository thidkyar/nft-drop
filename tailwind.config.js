module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            // transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            // transform: 'translateY(0)',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          }
        },
        'slide-in-down': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          }
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-in',
        'slide-in-right': 'slide-in-right 1s ease-in',
        'slide-in-down': 'slide-in-down 1s ease-in',
      },
    },
  },
  plugins: [],
}
