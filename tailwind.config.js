/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    fontFamily: {
      pizza: 'Roboto Mono , monospace',
    },
    extend: {
      fontSize: {
        hug: ['8rem', { lineHeight: '1' }],
      },
      height: {
        Screen: '100dvh',
      },
    },
  },
  plugins: [],
};
