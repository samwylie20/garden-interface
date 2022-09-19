/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/**.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      baseGray: "#f0f2ed",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["lemonade"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
