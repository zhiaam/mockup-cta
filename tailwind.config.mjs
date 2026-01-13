/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    fontFamily: {
      primary: "var(--font-dmSans)",
      secondary: "var(--font-barlow)",
    },
    extend: {
      colors: {
        primary: "#0b0b0b",   // hitam premium
        secondary: "#b5b5b5",
        gold: "#d4af37",      // emas
        accent: "#7a1f2b",    // maroon CTA
        cream: "#f6f5f2",
      },
      boxShadow: {
        premium: "0 20px 60px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
