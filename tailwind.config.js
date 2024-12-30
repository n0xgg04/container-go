/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{jsx,tsx}', './shared/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        SFProRoundedBold: 'SFProRoundedBold',
      },
    },
  },
  plugins: [],
};
