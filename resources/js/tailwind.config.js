/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.jsx", // Ini sangat penting agar Tailwind baca file JSX kamu
      "./resources/**/*.js",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }