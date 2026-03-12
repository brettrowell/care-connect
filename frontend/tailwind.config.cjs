const shared = require("@care-connect/config/nativewind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...shared,
  content: ["./src/**/*.{ts,tsx}", "../shared/packages/ui/src/native/**/*.{ts,tsx}"]
};
