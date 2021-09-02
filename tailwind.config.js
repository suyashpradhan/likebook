module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#1EA5FC",
        secondary: "",
        danger: "#ff0000",
        "text-primary": "#4b4c4d",
        "text-secondary": "#5c5b5b",
        background: "#f5f5f7",
        border: "#E8E7E9",
      },
      fontFamily: {
        default: "Inter, sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
