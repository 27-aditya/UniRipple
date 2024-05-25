module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cutcolor:{
          darkgrey: '#383c4a',
          lightgrey: '#4b5162',
          blue: '#74a9e7',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
