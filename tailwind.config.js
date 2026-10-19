module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'secondary-color': 'var(--secondary-color)',
        'main-light-color': 'var(--main-light-color)',
        'secondary-light-color': 'var(--secondary-light-color)',
        'neutral-4': 'rgb(71 85 105)',
      },
      brightness: {
        25: '.25',
      },
      keyframes: {
        'fade-in': {
          from: {opacity: '0'},
          to: {opacity: '1'},
        },
        'fade-up': {
          from: {opacity: '0', transform: 'translateY(1rem)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        'zoom-out': {
          from: {opacity: '0', transform: 'scale(1.08)'},
          to: {opacity: '1', transform: 'scale(1)'},
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out both',
        'fade-up': 'fade-up 500ms ease-out both',
        'zoom-out': 'zoom-out 1200ms ease-out both',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
