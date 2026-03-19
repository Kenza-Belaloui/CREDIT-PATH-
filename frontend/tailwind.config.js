/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#7c3aed",
        success: "#10b981",
        danger: "#f43f5e",
        dark: "#020617",
        surface: "#0f172a",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.25)",
        glow: "0 12px 30px rgba(37, 99, 235, 0.22)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      maxWidth: {
        "8xl": "1440px",
      },
    },
  },
  plugins: [],
}