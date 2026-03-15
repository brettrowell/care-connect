/**
 * Web stub for react-native's codegenNativeCommands (native-only).
 * Returns an object with no-op command functions for react-native-screens on web.
 */
export default function codegenNativeCommands(spec) {
  const commands = {};
  (spec?.supportedCommands || []).forEach((cmd) => {
    commands[cmd] = () => {};
  });
  return commands;
}
