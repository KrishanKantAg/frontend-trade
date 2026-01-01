import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(6, 7, 11)",
          secondary: "rgb(16, 17, 20)",
          tertiary: "rgb(24, 24, 26)",
        },
        foreground: "rgb(252, 252, 252)",
        primary: {
          DEFAULT: "rgb(82, 111, 255)",
          hover: "rgb(102, 131, 255)",
          blue: "rgb(82, 111, 255)",
          green: "rgb(18, 175, 128)",
          red: "rgb(242, 84, 97)",
          orange: "rgb(226, 124, 77)",
          yellow: "rgb(220, 193, 60)",
          lightBlue: "rgb(82, 197, 255)",
        },
        stroke: {
          primary: "rgb(34, 36, 45)",
          secondary: "rgb(50, 53, 66)",
          subtle: "rgb(31, 31, 35)",
        },
        text: {
          primary: "rgb(252, 252, 252)",
          secondary: "rgb(200, 201, 209)",
          tertiary: "rgb(119, 122, 140)",
        },
        chart: {
          up: "rgb(11, 153, 129)",
          down: "rgb(242, 53, 70)",
        },
        increase: "rgb(47, 227, 172)",
        "increase-hover": "rgb(91, 231, 189)",
        decrease: "rgb(236, 57, 122)",
        "decrease-hover": "rgb(248, 100, 154)",
      },
      borderRadius: {
        lg: "4px",
        md: "4px",
        sm: "4px",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "sans-serif"],
        mono: ["monospace"],
      },
      transitionDuration: {
        "125": "125ms",
        "135": "135ms",
        "150": "150ms",
      },
      spacing: {
        "screen-safe": "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
      },
    },
  },
  plugins: [],
};

export default config;

