import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Authoritative OSAAC Color Palette
        'osaac-bg': '#0a0f1a',
        'osaac-bg-secondary': '#111827',
        'osaac-primary': '#3b82f6',
        'osaac-primary-light': '#60a5fa',
        'osaac-primary-dark': '#2563eb',
        'osaac-text': '#f1f5f9',
        'osaac-text-secondary': '#94a3b8',
        'osaac-text-muted': '#64748b',
        'osaac-border': 'rgba(255, 255, 255, 0.08)',
        'osaac-glow': 'rgba(59, 130, 246, 0.35)',

        // Semantic aliases for existing classes
        obsidian: '#0a0f1a',
        graphite: '#111827',
        champagne: '#3b82f6',
        mutedgold: '#2563eb',
        ivory: '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
