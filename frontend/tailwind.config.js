
import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        navPrimary: "#FB8C00",
        navSecondary: "#7FB432",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui(),require("daisyui")],
}

