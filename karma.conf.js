const path = require('path');

const commonjs = require('@rollup/plugin-commonjs');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const ts = require('@wessberg/rollup-plugin-ts');

const meta = require('./package.json');

module.exports = function (config) {
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
        commonjs(),
        ts({
          tsconfig(resolvedConfig) {
            return {
              ...resolvedConfig,
              inlineSourceMap: true,
              module: 'ESNext',
              sourceMap: false,
              target: 'ES5'
            };
          }
        })
      ],
      output: {
        format: 'iife',
        name: meta.name,
        sourcemap: 'inline'
      }
    }
  });
};
