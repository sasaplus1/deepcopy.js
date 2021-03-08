import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import ts from '@wessberg/rollup-plugin-ts';

import meta from './package.json';

const config = [];

if (process.env.build === 'esm') {
  config.push({
    input: './index.ts',
    output: {
      file: './dist/esm/index.mjs',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      ts({
        tsconfig(resolvedConfig) {
          return {
            ...resolvedConfig,
            declaration: false
          };
        }
      })
    ]
  });
}

if (process.env.build === 'umd') {
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

  const terserOptions = {
    ecma: 2020,
    compress: {
      passes: 2
    },
    output: {
      preamble: banner
    }
  };

  config.push(
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/umd/${meta.name}.legacy.js`,
        format: 'umd',
        name: meta.name,
        sourcemap: true
      },
      plugins: [
        nodeResolve(),
        commonjs(),
        ts({
          tsconfig(resolvedConfig) {
            return {
              ...resolvedConfig,
              declaration: false,
              target: 'ES5'
            };
          }
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        // NOTE: add header with terser
        // banner,
        file: `./dist/umd/${meta.name}.legacy.min.js`,
        format: 'umd',
        name: meta.name
      },
      plugins: [
        nodeResolve(),
        commonjs(),
        ts({
          tsconfig(resolvedConfig) {
            return {
              ...resolvedConfig,
              declaration: false,
              target: 'ES5'
            };
          }
        }),
        terser({
          ...terserOptions,
          ecma: 5
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/umd/${meta.name}.js`,
        format: 'umd',
        name: meta.name,
        sourcemap: true
      },
      plugins: [
        nodeResolve(),
        commonjs(),
        ts({
          tsconfig(resolvedConfig) {
            return {
              ...resolvedConfig,
              declaration: false
            };
          }
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        // NOTE: add header with terser
        // banner,
        file: `./dist/umd/${meta.name}.min.js`,
        format: 'umd',
        name: meta.name
      },
      plugins: [
        nodeResolve(),
        commonjs(),
        ts({
          tsconfig(resolvedConfig) {
            return {
              ...resolvedConfig,
              declaration: false
            };
          }
        }),
        terser(terserOptions)
      ]
    }
  );
}

export default config;
