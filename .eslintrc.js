module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    globalThis: true
  },
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
      ],
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'node/no-unsupported-features/es-syntax': 'off'
      },
      settings: {
        node: {
          tryExtensions: ['.ts', '.js', '.json', '.json']
        }
      }
    },
    {
      env: {
        mocha: true
      },
      files: ['test/**/*.ts'],
      rules: {
        'node/no-unsupported-features/es-builtins': 'off'
      }
    },
    {
      files: ['rollup.config.js'],
      rules: {
        'node/no-unsupported-features/es-syntax': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  root: true
};
