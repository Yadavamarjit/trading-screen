module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBackground: "#ffffff",
        lightText: "#333333",
        darkBackground: "#1a1a1a",
        darkText: "#f5f5f5",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".no-scrollbar": {
            "scrollbar-width": "none",
            "-ms-overflow-style": "none",
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
