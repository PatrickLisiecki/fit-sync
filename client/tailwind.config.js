/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      backgroundImage: {
        sprinkle: "url('/sprinkle.svg')",
      },
      colors: {
        primary: "#333333",
        secondary: "#565656",
        accent: "#FFA500",
        sidebar: "#424242",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
});
