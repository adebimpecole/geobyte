/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#4f46e5",
      activeblue: "#4338ca",
      inactiveblue: "#c7d2fe",
      faintblue: "#f9fafb",
      skyblue: "#0371c5",
      white: "#ffffff",
      grey: "#9ca3af",
      black: "#111827",
      green: "#4ade80",
      red: "#db1010",
      lightgreen: "#4ade801a",
      liltransparent: "#0000000d",
      transparent: "#11182700",
      modaltransparent: '#00000067',
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
