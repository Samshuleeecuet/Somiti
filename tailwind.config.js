/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        NovaSquare: ['Nova Square', 'sans-serif'],
        Exo2: ['Exo 2','sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
}