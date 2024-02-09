/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
        serif: ["PT serif", ...defaultTheme.fontFamily.serif],
      },
      colors: { primary: "#e06d5e" },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
