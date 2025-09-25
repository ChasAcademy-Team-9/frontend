export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3c4a3e',
        secondary: '#719677',
        background: '#f6edd9',
        textDark: '#333333',
        textLight: '#ffffff',
        error: '#b91c1c',
        success: '#166534',
        warning: '#f79e2a',
        link: '#166534',
        hover: '#2d5a32',
        disabled: '#9ca3af',
        border: '#e5e7eb',
        surface: '#ffffff',
        focus: '#3c4a3e',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}