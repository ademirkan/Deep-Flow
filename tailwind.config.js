module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        bg: "var(--bg-color)",
        altsecondary: "var(--alt-secondary-color)",
      },
    },
  },
  plugins: [],
};
