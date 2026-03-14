const shared = require("@care-connect/config/nativewind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...shared,
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/native/**/*.{ts,tsx}"]
};
