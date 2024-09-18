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
          DEFAULT: '#FF0000',
          '50': '#FFE5E5',
          '100': '#FFCCCC',
          '200': '#FF9999',
          '300': '#FF6666',
          '400': '#FF3333',
          '500': '#FF0000',
          '600': '#CC0000',
          '700': '#990000',
          '800': '#660000',
          '900': '#330000'
        },
        red: {
          400: '#f87171',
          600: '#dc2626',
        },
        'custom-red': '#AA172C',
      },
      fontSize: {
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
};
