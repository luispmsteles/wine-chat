import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#2C2C2C",
        dark: {
          DEFAULT: "#1E1E1E",
          secondary: "#2C2C2C",
        },
        light: {
          DEFAULT: "#FFFFFF",
          secondary: "#D9D9D9",
        },
        neutral: {
          DEFAULT: "#767676",
          secondary: "#E3E3E3",
          tertiary: "#F5F5F5",
          quaternary: "#757575"
        },
      },
      screens: {
        xs: "340px"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-fluid-type")({
      settings: {
        fontSizeMin: 1, // min 1rem
        fontSizeMax: 1.5, // max 1.5rem
        screenMin: 320, // min screen size in px
        screenMax: 1440, // max screen size in px
        unit: "rem",
      },
      ranges: {
        h1: { min: "3rem", max: "5.5rem" },
        h2: { min: "2.5rem", max: "4.125rem" },
        h3: { min: "2rem", max: "3.25rem" },
        h4: { min: "1.5rem", max: "2.375rem" },
        h5: { min: "1.25rem", max: "1.875rem" },
        h6: { min: "1rem", max: "1.375rem" },
        main: { min: "1rem", max: "1.125rem" },
      },
    }),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
