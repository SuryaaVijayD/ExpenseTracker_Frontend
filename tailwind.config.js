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
          main: "#FFFFFF",    
          lightWhite:"#F3F4F6", 
          card1: "#FFF6FB",    
          card2:"#FEF6E1", 
          cardlightblue: "#EBF7FF",
          surface: "#E5E7EB", 
          secondary: "#18004D",
          secorndaryIcon: "#3C2669",
        },

        text: {
          primary: "#111827",
          primary2: "#EBF7FF",
          teritery: "#FD7979",
          secondary: "#4B5563",
          secondary2: "#393D7E",
          muted: "#6B7280",
          disabled: "#9CA3AF",
        },

        accent: "#38BDF8",
      },

      fontFamily: {
        nunito: ["Nunito_400Regular"],
        nunitoLight: ["Nunito_300Light"],
        nunitoSemi: ["Nunito_600SemiBold"],
        nunitoBold: ["Nunito_700Bold"],
      },

      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
