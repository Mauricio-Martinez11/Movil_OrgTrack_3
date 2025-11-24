/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",      // todas tus pantallas expo-router
    "./components/**/*.{js,jsx,ts,tsx}", // tus componentes
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
