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
        bordeaux: "#8B1A1A",
        "bordeaux-dark": "#6B1414",
        gold: "#C9A84C",
        "gold-light": "#E8C96A",
        beige: "#F5F0E8",
        "beige-dark": "#EDE6D6",
        dark: "#2C2C2C",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
