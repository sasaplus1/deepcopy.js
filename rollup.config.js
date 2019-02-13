import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import meta from './package.json';

const banner = [
  '/*!',
  ' * @license deepcopy.js Copyright(c) 2013 sasa+1',
  ' * https://github.com/sasaplus1/deepcopy.js',
  ' * Released under the MIT license.',
  // TODO: type-detect licensing got from node_modules/type-detect/index.js with manual
  ' *',
  ' * type-detect',
  ' * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>',
  ' * MIT Licensed',
  ' */'
].join('\n');

const nodeResolveOptions = {
  browser: true,
  extensions: ['.mjs', '.js'],
  main: true,
  module: true
};

const babelOptions = {
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
};

const terserOptions = {
  output: {
    preamble: banner
  }
};

export default [
  {
    input: './index.mjs',
    output: {
      banner,
      file: './umd/deepcopy.legacy.js',
      format: 'umd',
      name: meta.name,
      // NOTE: break sourcemap
      // https://github.com/rollup/rollup/wiki/Troubleshooting#sourcemap-is-likely-to-be-incorrect
      sourcemap: true
    },
    plugins: [nodeResolve(nodeResolveOptions), commonjs(), babel(babelOptions)]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './umd/deepcopy.legacy.min.js',
      format: 'umd',
      name: meta.name
    },
    plugins: [
      nodeResolve(nodeResolveOptions),
      commonjs(),
      babel(babelOptions),
      terser(terserOptions)
    ]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './umd/deepcopy.js',
      format: 'umd',
      name: meta.name,
      sourcemap: true
    },
    plugins: [nodeResolve(nodeResolveOptions), commonjs()]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './umd/deepcopy.min.js',
      format: 'umd',
      name: meta.name
    },
    plugins: [
      nodeResolve(nodeResolveOptions),
      commonjs(),
      terser(terserOptions)
    ]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './umd/deepcopy.mjs',
      format: 'es',
      name: meta.name,
      sourcemap: true
    },
    plugins: [nodeResolve(nodeResolveOptions), commonjs()]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './umd/deepcopy.min.mjs',
      format: 'es',
      name: meta.name
    },
    plugins: [
      nodeResolve(nodeResolveOptions),
      commonjs(),
      terser(terserOptions)
    ]
  }
];
