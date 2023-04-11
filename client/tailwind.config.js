/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        theme1: {
          "primary": "#7387f8",
          "secondary": "#f8e473",
          "neutral": "#6530e6",
          "light": "#359cfe",
          "base-100": "#FFFFFF",
          "white": "#ffffff",
          "black": "#000000",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        }
      }
    ]
  },
  plugins: [require("daisyui")],
};