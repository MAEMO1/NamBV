import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium, calm color palette
        primary: {
          50: '#f0f7f4',
          100: '#d9ebe2',
          200: '#b5d7c7',
          300: '#89bda7',
          400: '#5d9d84',
          500: '#3d8268',
          600: '#2d6853',
          700: '#265444',
          800: '#214438',
          900: '#1c3930',
          950: '#0e201b',
        },
        secondary: {
          50: '#f6f5f0',
          100: '#e8e6db',
          200: '#d3cfb9',
          300: '#bab391',
          400: '#a59a71',
          500: '#968a63',
          600: '#817154',
          700: '#695a46',
          800: '#594c3e',
          900: '#4d4238',
          950: '#2b231d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
