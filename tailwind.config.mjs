/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      display: ['group-hover'],
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },

      keyframes: () => ({
        fadeOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }),
    },
  },
  plugins: [],
}
