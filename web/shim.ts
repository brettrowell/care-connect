/**
 * Web shims for react-native-web and Vite.
 * Polyfills that may be needed for older browsers can go here.
 */
if (typeof globalThis === 'undefined') {
  (window as any).globalThis = window;
}
