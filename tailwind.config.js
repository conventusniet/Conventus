/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': {
          DEFAULT: '#AA172C',
          '50': '#FDF2F4',
          '100': '#FBE5E8',
          '200': '#F7CCD3',
          '300': '#F0A3AF',
          '400': '#E46E82',
          '500': '#D23C56',
          '600': '#AA172C',
          '700': '#8D1022',
          '800': '#75101F',
          '900': '#62111D'
        },
        red: {
          50: '#FDF2F4',
          100: '#FBE5E8',
          200: '#F7CCD3',
          300: '#F0A3AF',
          400: '#E46E82',
          500: '#D23C56',
          600: '#AA172C',
          700: '#8D1022',
          800: '#75101F',
          900: '#62111D',
          950: '#37050C',
        },
        'custom-red': '#AA172C',
        // Muted gold accent for the premium-diplomatic look
        'accent': {
          DEFAULT: '#C8A04B',
          '300': '#E2C988',
          '400': '#D4B468',
          '500': '#C8A04B',
          '600': '#A9833A',
        },
        // Warm ink neutrals (use instead of pure black/gray for a softer, premium feel)
        'ink': {
          DEFAULT: '#1C1917',
          '700': '#44403C',
          '500': '#78716C',
          '100': '#F5F3F0',
        },
        // Ivory / parchment canvas for the institutional look
        'paper': {
          DEFAULT: '#F4EFE4',
          'dark': '#EBE3D3',
        },
      },
      letterSpacing: {
        widest: '0.28em',
      },
      fontSize: {
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
};
