/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#ffa954',
          400: '#ff8f26',
          500: '#ff6a00',
          600: '#e66000',
          700: '#b34400',
        },
        accent: {
          DEFAULT: '#ff6a00',
          hover: '#ff8f26',
        },
      },
      fontFamily: {
        coconat: ['Coconat', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 106, 0, 0.3)',
        'glow-strong': '0 0 30px rgba(255, 106, 0, 0.5)',
        card: '0 0 15px rgba(255, 106, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
