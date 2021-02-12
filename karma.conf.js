const path = require('path');

const commonjs = require('@rollup/plugin-commonjs');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');

const meta = require('./package.json');

module.exports = function (config) {
  const weaksetPolyfill = require.resolve('core-js/es/weak-set');

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
        pattern: weaksetPolyfill,
        type: 'js'
      },
      {
        pattern: 'test/**/*.ts',
        type: 'js',
        watched: true
      }
    ],
    frameworks: ['mocha', 'power-assert'],
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    preprocessors: {
      '+(src|test)/**/*.ts': ['rollup', 'espower']
    },
    reporters: ['dots'],
    rollupPreprocessor: {
      plugins: [
        nodeResolve(),
        typescript({
          inlineSourceMap: true,
          newLine: 'lf',
          strict: true,
          target: 'ES5'
        }),
        commonjs()
      ],
      output: {
        format: 'iife',
        name: meta.name,
        sourcemap: 'inline'
      }
    }
  });
};
