/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "y-scale": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        "slide-out": {
          "0%": {
            opacity: 100,
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
        },
      },
      animation: {
        "y-scale": "y-scale 1s ease-in-out 1",
        "slide-out": "slide-out .3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
