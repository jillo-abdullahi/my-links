/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          700: "#633CFF",
          300: "#BEADFF",
          100: "#EFEBFF",
        },
        gray: {
          700: "#333333",
          400: "#737373",
          300: "#EEEEEE",
          200: "#D9D9D9",
          100: "#FAFAFA",
        },
        red: {
          700: "#FF0000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
