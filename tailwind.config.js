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
    },
  },
  plugins: [require('flowbite/plugin')],
};
