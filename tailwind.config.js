/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#d1d5db', // You can now use class="border border-border"
        foreground: '#1f2937', // Now you can use class="text-foreground"
      },
    },
  },
  plugins: [],
};
