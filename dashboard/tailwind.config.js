/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#443627',
            hover: '#2e241a'
          },
          secondary: {
            DEFAULT: '#D98324',
            hover: '#b16b1d'
          },
          accent: {
            light: '#F2F6D0',
            DEFAULT: '#EFDCAB',
            hover: '#e5cb8a'
          }
        }
      },
    },
    plugins: [],
  };