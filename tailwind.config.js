/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        /* ================= BACKGROUNDS ================= */
        bg: {
          main: "#FFFFFF",
          lightWhite: "#F3F4F6",
          surface: "#E5E7EB",
        },

        /* ================= TEXT ================= */
        text: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#6B7280",
          disabled: "#9CA3AF",
        },

        /* ================= BRAND ================= */
        brand: {
          primary: "#393D7E",
          accent: "#4DA3FF",

          // Transparent brand variants (PRO)
          primarySoft: "rgba(57, 61, 126, 0.15)",
          primaryMedium: "rgba(57, 61, 126, 0.35)",
          primaryStrong: "rgba(57, 61, 126, 0.7)",
        },

        /* ================= OVERLAYS / GLASS ================= */
        overlay: {
          dark: "rgba(0, 0, 0, 0.35)",
          darker: "rgba(0, 0, 0, 0.55)",
          light: "rgba(255, 255, 255, 0.6)",
        },
      },

      /* ================= FONTS ================= */
      fontFamily: {
        nunito: ["Nunito_400Regular"],
        nunitoLight: ["Nunito_300Light"],
        nunitoSemi: ["Nunito_600SemiBold"],
        nunitoBold: ["Nunito_700Bold"],
      },

      /* ================= RADIUS ================= */
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
