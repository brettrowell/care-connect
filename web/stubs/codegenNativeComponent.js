import React from 'react';
import { View } from 'react-native-web';

/**
 * Web stub for react-native's codegenNativeComponent (native-only).
 * Returns a no-op View-based component for use in react-native-safe-area-context etc.
 */
export default function codegenNativeComponent(componentName, _options) {
  const Stub = React.forwardRef((props, ref) => React.createElement(View, { ...props, ref }));
  Stub.displayName = componentName || 'CodegenStub';
  return Stub;
}
