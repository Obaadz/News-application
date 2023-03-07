/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./layouts/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        game: "url('/images/game_bg3.png')",
        auth: "url('/images/auth_bg.png')",
        dvd: "url('/images/dvd.png')",
      },
      fontFamily: {
        amiri: ["Amiri", "ui-sans-serif"],
        lalezar: ["Lalezar", "cursive"],
      },
      dropShadow: {
        border: "0 1.2px 1.2px rgba(0, 0, 0, 0.8)",
      },
    },
    plugins: [],
  },
};
