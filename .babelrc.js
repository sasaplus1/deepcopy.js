module.exports = function (api) {
  const config = {};

  if (api.env('cjs')) {
    config.compact = false;
    config.minified = false;
    config.presets = [
      [
        '@babel/preset-env',
        {
          debug: true,
          modules: 'commonjs',
          targets: {
            node: '6'
          }
        }
      ]
    ];
    config.plugins = [
      [
        'transform-rename-import',
        {
          replacements: [
            {
              original: '(.*)\\.mjs$',
              replacement: '$1.js'
            },
            {
              original: '^\\./src',
              replacement: './cjs'
            }
          ]
        }
      ]
    ];
  }

  if (api.env('umd')) {
    config.compact = false;
    config.minified = false;
  }

  if (api.env('mocha:cjs')) {
    config.compact = false;
    config.minified = false;
    config.presets = [
      [
        '@babel/preset-env',
        {
          debug: true,
          modules: 'commonjs',
          targets: {
            node: 'current'
          }
        }
      ],
      'power-assert'
    ];
    config.plugins = [
      [
        'transform-rename-import',
        {
          replacements: [
            {
              // NOTE: change to use CommonJS script
              original: '^\\.\\./index\\.mjs$',
              replacement: '../index.js'
            }
          ]
        }
      ]
    ];
  }

  if (api.env('mocha:mjs')) {
    config.compact = false;
    config.minified = false;
    config.presets = [
      [
        '@babel/preset-env',
        {
          debug: true,
          modules: 'commonjs',
          targets: {
            node: 'current'
          }
        }
      ],
      'power-assert'
    ];
  }

  if (api.env('karma')) {
    config.compact = false;
    // NOTE: fix circular dependencies in core-js
    // https://github.com/rollup/rollup-plugin-commonjs/issues/284#issuecomment-361085666
    config.exclude = ['node_modules/core-js/**/*.js'];
    config.minified = false;
    config.presets = [
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
    ];
    config.plugins = [
      [
        'transform-rename-import',
        {
          replacements: [
            {
              original: '^assert$',
              replacement: require.resolve('power-assert/build/power-assert.js')
            }
          ]
        }
      ],
      // NOTE: this plugin is include in babel-preset-power-assert.
      'babel-plugin-espower'
    ];
  }

  return config;
};
