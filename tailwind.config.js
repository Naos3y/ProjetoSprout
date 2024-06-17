/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        tara: ["Tarah", "sans-serif"],
        proza: ["proza", "Proza Libre"],
      },

      colors: {
        green: {
          500: "#87B421",
        },
      },
    },
  },
  plugins: [],
};
