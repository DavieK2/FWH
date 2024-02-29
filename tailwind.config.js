/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'grey-700' : '#344054',
        'grey-600' : '#475467',
        'dark-green': '#0D8A6A',
        'light-green': '#E7F5F1',
        'light-green-300' : '#5EBAA2'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

