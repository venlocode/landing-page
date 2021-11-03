module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      primary: "#00B2FF",
      secondary: "white",
      tertiary: "#6A819F",
      bgPrimary: "#121319",
      bgSecondary: "#1A202C",
      bgTertiary: "#6A819F"
    },
    margin: {
      extend: {
        auto: "auto"
      }
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'), // or require('postcss-nesting')
    require('autoprefixer'),
  ],
};
