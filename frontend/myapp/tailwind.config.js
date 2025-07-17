/** @type {import('tailwindcss').Config} */
export default {
  
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      Playfair_Display: ['"Playfair Display"', 'serif'],
      Lato: ['"Lato"', 'sans-serif'],
      Poppins: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [],
}

