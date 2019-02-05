module.exports = function() {
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
