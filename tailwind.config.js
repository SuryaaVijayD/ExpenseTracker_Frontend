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
        bg: {
          main: "#0B0F14",     
          card: "#111311",     
          surface: "#1A1F26", 
        },

        text: {
          primary: "#FFFFFF",
          secondary: "#9CA3AF",
          muted: "#6B7280",
          disabled: "#4B5563",
        },

        accent: "#38BDF8",
      },

      fontFamily: {
        p: ["Poppins_400Regular"],  
        pbold: ["Poppins_700Bold"], 
      },

      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
