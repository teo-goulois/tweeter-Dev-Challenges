/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      blue: "#2F80ED",
      primary: "#333333",
      secondary: "#828282",
      gray: "#4F4F4F",
      gray2: "#FAFAFA",
      gray3: "#F2F2F2",
      gray4: "#BDBDBD",
      green: "#27AE60",
      red: "#EB5757",
      cyan: "#2D9CDB ",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-no-scrollbar")],
};
