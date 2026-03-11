const shared = require("@care-connect/config/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...shared,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}"
  ]
};
