/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F4E79',
          hover: '#2E75B6',
          light: '#5B9BD5',
        },
        success: '#28A745',
        warning: '#FD7E14',
        danger: '#DC3545',
        info: '#17A2B8',
        background: '#F4F6F9',
        surface: '#FFFFFF',
        text: {
          primary: '#212529',
          secondary: '#6C757D',
        },
        border: '#DEE2E6',
        sidebar: '#1A3A5C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
