/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        golden: "#D69723",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkmode: "class",
};
