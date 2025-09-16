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
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd18d',
          400: '#5bb55b',
          500: '#38a138',
          600: '#2b7d2b',
          700: '#246524',
          800: '#1f511f',
          900: '#1a431a',
        },
        nature: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
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
        'nature-gradient': 'linear-gradient(135deg, #365314 0%, #4d7c0f 50%, #65a30d 100%)',
        'camp-gradient': 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
      },
    },
  },
  plugins: [],
}
