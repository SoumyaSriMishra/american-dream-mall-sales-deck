import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory:       '#FAF8F3',
        parchment:   '#F2EDE4',
        linen:       '#EDE5D8',
        charcoal:    '#1C1B19',
        espresso:    '#2C2420',
        slate:       '#3D3A35',
        amber:       '#C8922A',
        'amber-light': '#E8B356',
        rust:        '#A84C2F',
        sage:        '#7A8C72',
        'dusty-rose':'#C4897A',
        'warm-grey': '#9A948C',
        border:      '#E0D9CE',
        'dark-border':'#3A3530',
      },
      fontFamily: {
        display:  ['Cormorant', 'Georgia', 'serif'],
        body:     ['Outfit', 'system-ui', 'sans-serif'],
        impact:   ['Bebas Neue', 'Arial Black', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth':   'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '700': '700ms',
        '900': '900ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
