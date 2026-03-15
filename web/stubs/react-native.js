/**
 * Web shim for 'react-native': re-exports react-native-web and adds stubs
 * for native-only APIs (codegenNativeComponent, TurboModuleRegistry, etc.)
 * so packages like react-native-screens and react-native-safe-area-context work.
 */
export * from 'react-native-web';
export { default as codegenNativeComponent } from './codegenNativeComponent.js';
export { default as codegenNativeCommands } from './codegenNativeCommands.js';
export { default as TurboModuleRegistry } from './TurboModuleRegistry.js';
