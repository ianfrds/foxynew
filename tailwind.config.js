/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        'primary-dark': '#C1121F',
        'bg-light': '#F8F9FA',
        'brand-cream': '#FAF6F0',
        'brand-yellow': '#F4D068',
        'brand-dark': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'input': '8px',
        'card': '12px',
      },
    },
  },
  plugins: [],
}
