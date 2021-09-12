module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#9f9fa1",
        accent: "#1877f2",
        background: "#0f0f13",
        "background-light": "#1a1c20",
        border: "#E8E7E9",
        danger: "#ff0000",
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
