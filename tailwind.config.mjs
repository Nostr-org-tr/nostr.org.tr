/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        nostr: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        lightning: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        tr: {
          red: '#e11d48',
          crimson: '#be123c',
        },
        surface: {
          light: '#f8fafc',
          card: '#ffffff',
          'card-hover': '#f1f5f9',
          dark: '#0b0f19',
          'dark-card': '#111827',
          'dark-card-hover': '#1f2937',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
};
