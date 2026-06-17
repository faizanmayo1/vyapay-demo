import animate from 'tailwindcss-animate'

// VyaPay — Voltage light. Deep-indigo structure + electric "volt" accent (brand + AI).
// Token keys kept as steel/amber (+ navy/red/sky aliases) so shared primitives stay wired;
// VALUES remapped to the VyaPay palette.

// Structure / primary — deep indigo
const steel = {
  DEFAULT: '#312E81',
  raised: '#3A368F',
  line: '#474397',
  muted: '#9A98C9',
  soft: '#C3C1E4',
  fore: '#EEEDFA',
  50: '#EEF0FF',
  100: '#E0E2FB',
  200: '#C4C6F5',
  300: '#9FA0EC',
  400: '#7B79E0',
  500: '#5B57CC',
  600: '#4844B0',
  700: '#312E81',
  800: '#272561',
  900: '#1C1B45',
}

// Electric "volt" accent — brand highlight + AI moments + live current
const amber = {
  DEFAULT: '#5B5BF6',
  deep: '#3F3FD4',
  soft: '#E9E9FE',
  50: '#F1F1FE',
  100: '#E5E5FD',
  200: '#CFCFFB',
  300: '#AEAEF8',
  400: '#8585F4',
  500: '#5B5BF6',
  600: '#4848E8',
  700: '#3A3AD0',
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },

        // VyaPay brand palette
        canvas: { DEFAULT: '#F6F7FB', subtle: '#EDEFF6', raised: '#FFFFFF' },
        ink: { DEFAULT: '#11132B', muted: '#4A4E68', subtle: '#767A93', faint: '#959AAD' },
        hairline: { DEFAULT: '#E6E8F2', strong: '#D6D9E8' },
        // Structure — indigo
        steel,
        // Electric volt — brand + AI
        amber,
        // Back-compat aliases so shared components stay on-brand
        navy: steel,
        red: amber,
        sky: amber,
        // Volt ramp for the current/rail motif
        volt: { DEFAULT: '#5B5BF6', glow: '#8585F4', deep: '#3A3AD0' },
        signal: {
          positive: '#16A34A',
          'positive-soft': '#DCFCE7',
          warning: '#D97706',
          'warning-soft': '#FEF3C7',
          risk: '#DC2626',
          'risk-soft': '#FEE2E2',
          info: '#2563EB',
          'info-soft': '#DBEAFE',
          neutral: '#64748B',
          'neutral-soft': '#F1F5F9',
        },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(17, 19, 43, 0.04), 0 2px 6px rgba(17, 19, 43, 0.04)',
        card: '0 2px 4px rgba(17, 19, 43, 0.05), 0 8px 20px -4px rgba(17, 19, 43, 0.07)',
        'card-md': '0 4px 10px rgba(17, 19, 43, 0.06), 0 14px 32px -6px rgba(17, 19, 43, 0.10)',
        'card-lg': '0 18px 50px -10px rgba(17, 19, 43, 0.20), 0 6px 14px -4px rgba(17, 19, 43, 0.08)',
        inset: 'inset 0 0 0 1px rgba(17, 19, 43, 0.05)',
        'volt-glow': '0 0 0 4px rgba(91, 91, 246, 0.14)',
        'volt-lift': '0 10px 30px -8px rgba(91, 91, 246, 0.28), 0 4px 10px -4px rgba(49, 46, 129, 0.12)',
        'cta': '0 6px 18px -4px rgba(91, 91, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
      },
      letterSpacing: { 'tight-bank': '-0.02em', 'wide-eyebrow': '0.08em' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'scan-sweep': { '0%': { transform: 'translateY(-120%)' }, '100%': { transform: 'translateY(520%)' } },
        'slide-in-right': { from: { opacity: '0', transform: 'translateX(16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.45' } },
        'stream-in': { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'rail-flow': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '24px 0' } },
        'ticker': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'dash-flow': { to: { strokeDashoffset: '-16' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        'scan-sweep': 'scan-sweep 1.8s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'stream-in': 'stream-in 0.5s ease-out both',
        'rail-flow': 'rail-flow 0.8s linear infinite',
        'ticker': 'ticker 40s linear infinite',
        'dash-flow': 'dash-flow 0.6s linear infinite',
      },
    },
  },
  plugins: [animate],
}
