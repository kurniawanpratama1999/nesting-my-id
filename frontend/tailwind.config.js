/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    theme: {
      fontFamily: {
        jetbrains: ["JetBrains Mono", "serif"],
        poppins: ["Poppins", "serif"],
        playwrite: ["Playwrite AU SA", "serif"],
        montserrat: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
};
