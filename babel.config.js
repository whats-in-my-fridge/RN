module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for Expo Router.
      'expo-router/babel',
      // Required for NativeWind (Tailwind-style className on RN).
      'nativewind/babel',
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

