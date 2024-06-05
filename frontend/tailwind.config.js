
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
        navPrimary: "#007E85",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui(),require("daisyui")],
}

