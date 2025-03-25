import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "enbnb": "#ff385c",
        "enbnb-dark": "#d50027",
        "enbnb-footer": "#F7F7F7",
        "enbnb-black": "#000000",
        "enbnb-hover-black": "gray-600",
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
