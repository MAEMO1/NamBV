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
        // Sophisticated monochrome palette with cyan accent
        noir: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        // Cyan accent - refined, premium
        accent: {
          50: '#f0fdfb',
          100: '#ccfbf4',
          200: '#99f6ea',
          300: '#5eeadb',
          400: '#2dd4c5',
          500: '#5BBEC5', // Main accent - Ghelamco teal
          600: '#0e9488',
          700: '#10756d',
          800: '#125d58',
          900: '#144d49',
          950: '#042f2c',
        },
        // Warm white for backgrounds
        ivory: {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fafafa',
          300: '#f5f5f5',
          400: '#e8e8e8',
          500: '#d4d4d4',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Dramatic display sizes for hero statements
        'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 50px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 25px 80px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 40px rgba(91, 190, 197, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'fade-down': 'fadeDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'reveal': 'reveal 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} satisfies Config;
