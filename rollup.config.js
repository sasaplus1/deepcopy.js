import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import meta from './package.json';

const banner = [
  '/*!',
  ' * @license deepcopy.js Copyright(c) 2013 sasa+1',
  ' * https://github.com/sasaplus1/deepcopy.js',
  ' * Released under the MIT license.',
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
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        modules: false,
        targets: {
          browsers: ['IE >= 11', 'Android >= 4.4.4'],
          node: '4'
        },
        useBuiltIns: 'usage'
      }
    ]
  ]
};

export default [
  {
    input: './index.mjs',
    output: {
      banner,
      file: './dist/deepcopy.legacy.js',
      format: 'umd',
      name: meta.name,
      sourcemap: true
    },
    plugins: [nodeResolve(nodeResolveOptions), commonjs(), babel(babelOptions)]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './dist/deepcopy.legacy.min.js',
      format: 'umd',
      name: meta.name
    },
    plugins: [
      nodeResolve(nodeResolveOptions),
      commonjs(),
      babel(babelOptions),
      uglify()
    ]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './dist/deepcopy.js',
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
      file: './dist/deepcopy.min.js',
      format: 'umd',
      name: meta.name
    },
    plugins: [
      nodeResolve(nodeResolveOptions),
      commonjs(),
      babel(babelOptions),
      uglify()
    ]
  },
  {
    input: './index.mjs',
    output: {
      banner,
      file: './dist/deepcopy.mjs',
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
      file: './dist/deepcopy.min.mjs',
      format: 'es',
      name: meta.name
    },
    plugins: [nodeResolve(nodeResolveOptions), commonjs(), uglify()]
  }
];
