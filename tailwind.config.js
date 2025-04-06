/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary : "#031400",
        accent : "#AB8BFF",
        secondary : "#151312",
        light : {
          100 : "#D6C6FF",
          200 : "#A8B5DB",
          300 : "#9CA4AB",
        },
        dark : {
          100 : "#221f3d",
          200 : "#0f0d23"
        }
      }
    },
  },
  plugins: [],
}