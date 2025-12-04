/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    fontFamily: {
      pizza: 'Roboto Mono , monospace',
      Inter: 'Inter',
    },
    extend: {
      fontSize: {
        hug: ['8rem', { lineHeight: '1' }],
      },
      height: {
        Screen: '100dvh',
      },
      screens: {
        laptop: '1077px',
      },
    },
  },
  plugins: [],
};
