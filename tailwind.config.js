/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        leaf:      '#09CD47',
        'leaf-dark':  '#07A93B',
        'leaf-tint':  '#E9FBEF',
        sky:       '#38B6FF',
        'sky-dark':   '#1C93DE',
        'sky-tint':   '#EAF6FF',
        ink:       '#0A0A0A',
      },
      fontFamily: {
        display: ['Lora', 'serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-line': {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out both',
        'pulse-line': 'pulse-line 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
