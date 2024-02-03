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
        "d-gray": {
          100: "#EBEBEB",
          150: "#73767d",
          200: "#35363C",
          250: "#35373C",
          300: "#313338",
          400: "#2B2D31",
          500: "#1E1F22",
          600: "#111214",
        },
        "d-purple": "#5865F2",
        "d-white": "#FFFFFF",
        "d-green": "#2E8B57",
        "d-red": "#ED4245",
      },
    },
  },
  plugins: [],
};
export default config;
