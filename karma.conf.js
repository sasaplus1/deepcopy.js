const path = require('path');

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

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
        pattern: 'test/**/*.mjs',
        type: 'js',
        watched: true
      }
    ],
    frameworks: ['mocha', 'power-assert'],
    preprocessors: {
      'test/**/*.mjs': ['rollup', 'espower']
    },
    reporters: ['dots'],
    rollupPreprocessor: {
      plugins: [
        nodeResolve({
          browser: true,
          extensions: ['.mjs', '.js'],
          main: true,
          module: true
        }),
        commonjs(),
        babel({
          babelrc: false,
          compact: false,
          // NOTE: fix circular dependencies in core-js
          // https://github.com/rollup/rollup-plugin-commonjs/issues/284#issuecomment-361085666
          ignore: ['node_modules/core-js/**/*.js'],
          minified: false,
          presets: [
            [
              '@babel/preset-env',
              {
                debug: true,
                modules: false,
                targets: {
                  browsers: ['IE >= 11', 'Android >= 4.4.4']
                },
                useBuiltIns: 'usage'
              }
            ]
          ]
        })
      ],
      output: {
        format: 'umd',
        name: meta.name,
        sourcemap: 'inline'
      }
    }
  });
};
