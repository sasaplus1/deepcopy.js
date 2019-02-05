module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  globals: {
    globalThis: true
  },
  overrides: [
    {
      env: {
        mocha: true
      },
      files: ['test/**/*.js']
    }
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  root: true
};
