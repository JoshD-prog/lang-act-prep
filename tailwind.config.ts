import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        fog: '#e2e8f0',
        sky: '#14b8a6',
        sun: '#f59e0b',
        clay: '#be123c'
      },
      boxShadow: {
        glow: '0 10px 35px -12px rgba(20, 184, 166, 0.45)'
      }
    }
  },
  plugins: [forms]
};

export default config;
