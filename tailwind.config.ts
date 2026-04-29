import type { Config } from 'tailwindcss'

/**
 * Tailwind theme config for the NavyTrack dashboard.
 * Includes the color tokens and font families defined in the assessment spec.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy-bg': '#0D1B2A',
        'navy-surface': '#162032',
        'navy-border': '#1E2D40',
        'accent-blue': '#3B82F6',
        'accent-blue-light': '#60A5FA',
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#F87171',
        'text-primary': '#E2E8F0',
        'text-muted': '#64748B',
      },
      fontFamily: {
        outfit: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-row': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(1.25)' },
        },
      },
      animation: {
        'slide-up-fade': 'slide-up-fade 400ms ease-out both',
        'slide-in-row': 'slide-in-row 260ms ease-out both',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

