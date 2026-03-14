module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        // { jsxImportSource: 'nativewind' }
      ],
      'nativewind/babel',
    ],
    plugins: [
      // 'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: path.resolve(__dirname, '../../.env'),
          allowUndefined: true,
        },
      ],
    ],
  };
};
