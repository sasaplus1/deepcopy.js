const path = require('path');

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const meta = require('./package.json');

module.exports = function(config) {
  config.set({
    basePath: path.resolve(__dirname),
    browsers: ['ChromeHeadlessNoSandbox'],
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    customHeaders: [
      {
        match: '.*debug\\.html$',
        name: 'Content-Security-Policy',
        value:
          "default-src 'none'; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'"
      }
    ],
    customLaunchers: {
      // NOTE: https://docs.travis-ci.com/user/chrome#Sandboxing
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        chromeDataDir: path.resolve(__dirname, '.chrome'),
        flags: ['--no-sandbox']
      }
    },
    files: [
      {
        pattern: 'test/**/*.mjs',
        type: 'js',
        watched: true
      }
    ],
    frameworks: ['mocha', 'power-assert'],
    preprocessors: {
      'test/**/*.mjs': ['espower', 'rollup']
    },
    reporters: ['dots'],
    rollupPreprocessor: {
      plugins: [
        babel(),
        nodeResolve({
          browser: true,
          extensions: ['.mjs', '.js'],
          main: true,
          module: true
        }),
        commonjs()
      ],
      output: {
        format: 'umd',
        name: meta.name,
        sourcemap: 'inline'
      }
    }
  });
};
