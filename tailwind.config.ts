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
        // Neobrutalism color palette
        'brutal-red': '#FF6B6B',
        'brutal-blue': '#4ECDC4', 
        'brutal-yellow': '#FFE66D',
        'brutal-green': '#95E1D3',
        'brutal-pink': '#FF8FB1',
        'brutal-purple': '#A8E6CF',
      },
      fontFamily: {
        'brutal': ['Inter', 'sans-serif'],
        'synapse': ['Tagesschrift', 'var(--font-tagesschrift)', 'cursive'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px #000',
        'brutal-sm': '4px 4px 0px 0px #000',
        'brutal-lg': '12px 12px 0px 0px #000',
        'brutal-hover': '6px 6px 0px 0px #000',
      },
      borderWidth: {
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [],
};

export default config;
