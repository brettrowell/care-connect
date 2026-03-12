module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['module:@react-native/babel-preset'],
        babelrc: false,
        configFile: false,
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/.*/react-native/jest/react-native-env.js',
    'node_modules/(?!((react-native|@react-native|@react-navigation)(/|$)|\\.pnpm/(react-native|@react-native\\+[^/]+|@react-navigation\\+[^/]+)@))',
  ],
  setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '^@env$': '<rootDir>/__mocks__/env.js',
  },
};
