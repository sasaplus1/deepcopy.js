// import babel from 'rollup-plugin-babel';
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

export default [
  {
    input: 'src/index.js',
    output: {
      banner,
      file: 'dist/deepcopy.js',
      format: 'umd',
      name: meta.name,
      sourcemap: true
    },
    plugins: [
      nodeResolve({
        browser: true,
        main: true
      }),
      commonjs()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      banner,
      file: 'dist/deepcopy.min.js',
      format: 'umd',
      name: meta.name,
      sourcemap: true
    },
    plugins: [
      nodeResolve({
        browser: true,
        main: true
      }),
      commonjs(),
      uglify()
    ]
  }
];
