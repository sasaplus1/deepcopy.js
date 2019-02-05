module.exports = function(api) {
  api.cache(true);

  return {
    compact: false,
    env: {
      test: {
        presets: ['power-assert']
      }
    },
    minified: false,
    plugins: ['@babel/plugin-transform-modules-commonjs']
  };
};
