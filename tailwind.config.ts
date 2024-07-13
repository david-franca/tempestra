import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        cloud: 'url(/bg.png)',
      },
      colors: {
        text: {
          primary: '#FFF',
          secondary: '#C2BFF4',
          tertiary: '#DAD8F7',
        },
      },
      fontFamily: {
        lato: ['var(--font-lato)'],
      },
    },
  },
  plugins: [],
};
export default config;
