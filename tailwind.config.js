/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#eef9f1',
          100: '#d6f1dd',
          200: '#b2e3c1',
          300: '#84d3a1',
          400: '#4cbc7b',
          500: '#1f9d5a', // tuned toward logo green
          600: '#17804a',
          700: '#12683e',
          800: '#0f5333',
          900: '#0d432a',
        },
        nature: {
          50: '#f0fbf3',
          100: '#dbf6e3',
          200: '#b6ecc8',
          300: '#85dea6',
          400: '#4fcc80',
          500: '#2eb765', // primary accent green
          600: '#239556',
          700: '#1c7848',
          800: '#185f3c',
          900: '#144d33',
        },
        brand: {
          // Kenya flag-inspired tones
          green: '#009245',      // closer to logo green
          greenDark: '#007c3a',  // darker hover shade
          red: '#C8102E',        // vivid, balanced red from logo
          black: '#111111',
        },
        earth: {
          50: '#fef7ed',
          100: '#fdecd4',
          200: '#fbd5a8',
          300: '#f7b672',
          400: '#f2923a',
          500: '#ee7214',
          600: '#df580a',
          700: '#b9420b',
          800: '#923510',
          900: '#752d11',
        },
        camp: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #1a431a 0%, #2b7d2b 50%, #38a138 100%)',
        'nature-gradient': 'linear-gradient(135deg, #144d33 0%, #1c7848 50%, #2eb765 100%)',
        'brand-accent-gradient': 'linear-gradient(135deg, rgba(200,16,46,0.12) 0%, rgba(0,146,69,0.18) 100%)',
        'camp-gradient': 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
      },
    },
  },
  plugins: [],
}
