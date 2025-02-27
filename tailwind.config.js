/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors:{
        bglight:"#f9fbfc",
        headblack:"#222934",
        primarybtn:"#5046e4",
        secondarybtn:"#e0e7ff",
        secondarytxt:"#6c67cc",
        iconcolor:"#adb2b7"
      }
    },
  },
  plugins: [],
}