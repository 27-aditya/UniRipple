module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cutcolor:{
          darkgrey: '#1B262C',
          darkblue: '#0F4C75',
          blue: '#3282B8',
          lightblue: '#BBE1FA',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
