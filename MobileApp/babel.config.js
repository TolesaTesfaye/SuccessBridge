module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated plugin removed: app uses React Native Animated API, not Reanimated
    // The plugin was causing "_tracking" property errors by transforming standard Animated code
    // If you need Reanimated in the future, migrate animations first, then re-enable this plugin
    plugins: [],
  };
};
