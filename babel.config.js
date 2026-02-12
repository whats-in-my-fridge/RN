module.exports = function (api) {
  api.cache(true);
  return {
    // NativeWind v4 uses a Babel preset + JSX import source.
    // Putting nativewind/react-native-css-interop in "plugins" can cause:
    // ".plugins is not a valid Plugin property"
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // Keep TS path aliases working at runtime (Metro).
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            '@': './src',
            '@assets': './src/shared/assets',
          },
        },
      ],
    ],
  };
};

