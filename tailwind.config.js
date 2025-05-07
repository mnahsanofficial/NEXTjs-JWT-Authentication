/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            500: '#6366f1',
            600: '#4f46e5',
          },
        },
      },
    },
    plugins: [],
  }