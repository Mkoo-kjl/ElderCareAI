// @ts-check

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ElderCare brand palette
        brand: {
          50: "#eff8ff",
          100: "#dbeefe",
          200: "#bfe3fe",
          300: "#93d1fd",
          400: "#60b5fa",
          500: "#3b93f5",
          600: "#2574ea",
          700: "#1d5fd7",
          800: "#1e4dae",
          900: "#1e4389",
          950: "#172a54",
        },
        surface: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          lighter: "#334155",
        },
        accent: {
          DEFAULT: "#38BDF8",
          warm: "#F59E0B",
          success: "#22C55E",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
