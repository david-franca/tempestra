import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#FFF",
          secondary: "#C2BFF4",
          tertiary: "#DAD8F7",
          quaternary: "#87EBCD",
        },
        surface: "#6D67D0",
      },
      fontFamily: {
        lato: ["var(--font-lato)"],
      },
    },
  },
};
export default config;
