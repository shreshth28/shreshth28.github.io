/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        bg: "#0B0E14",
        surface: "#11151C",
        text: "#E6EDF3",
        muted: "#93A1B0",
        accent: "#2ECC71", // swap to '#2BBAC5' if you prefer cyan
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};
