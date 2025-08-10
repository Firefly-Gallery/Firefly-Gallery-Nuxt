/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        "dark": {
          "primary": "#6ee7b7",
          "secondary": "#fde047",
          "accent": "#76ABAE",
          "neutral": "#0e0e0e",
          "base-100": "rgb(28,28,28)",
          "info": "#3de36c",
          "success": "#4cc679",
          "warning": "#ffb174",
          "error": "#ef6161",
        }
      },
      {
        "light": {
          "primary": "#6ee7b7",
          "secondary": "#fde047",
          "accent": "#76ABAE",
          "neutral": "#cacaca",
          "base-100": "rgb(255,255,255)",
          "info": "#3de36c",
          "success": "#4cc679",
          "warning": "#ffb174",
          "error": "#ef6161",
        },
      }
    ],
  },
}