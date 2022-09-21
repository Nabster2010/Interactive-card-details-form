/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "hsl(0, 100%, 66%)",
        White: "hsl(0, 0%, 100%)",
        LightGrayishViolet: "hsl(270, 3%, 87%)",
        DarkGrayishViolet: "hsl(279, 6%, 55%)",
        VeryDarkViolet: "hsl(278, 68%, 11%)",
        gradientFrom: "hsl(249, 99%, 64%) ",
        gradientTo: "hsl(278, 94%, 30%)",
      },
      backgroundImage: {
        mobile: "url('/images/bg-main-mobile.png')",
        desktop: "url('/images/bg-main-desktop.png')",
      },
    },
  },
  plugins: [],
};
