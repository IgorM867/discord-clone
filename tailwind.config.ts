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
          200: "#41434a",
          250: "#383A40",
          300: "#35363C",
          350: "#35373C",
          400: "#313338",
          450: "#2B2D31",
          500: "#232428",
          550: "#1E1F22",
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
