import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

import meta from './package.json';

const config = [];

if (process.env.build === 'esm') {
  config.push({
    input: './index.ts',
    output: {
      dir: './dist/esm',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        module: 'ESNext',
        newLine: 'lf',
        strict: true,
        target: 'ESNext',
        outDir: './dist/esm'
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
    output: {
      preamble: banner
    }
  };

  const typescriptOptions = {
    newLine: 'lf',
    sourceMap: true,
    strict: true,
    target: 'ES5'
  };

  config.push(
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/umd/${meta.name}.legacy.js`,
        format: 'umd',
        name: meta.name,
        // NOTE: break sourcemap
        // https://github.com/rollup/rollup/wiki/Troubleshooting#sourcemap-is-likely-to-be-incorrect
        sourcemap: true
      },
      plugins: [nodeResolve(), commonjs(), typescript(typescriptOptions)]
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
        typescript({ ...typescriptOptions, sourceMap: false }),
        terser(terserOptions)
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
      plugins: [nodeResolve(), commonjs(), typescript(typescriptOptions)]
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
        typescript({ ...typescriptOptions, sourceMap: false }),
        terser(terserOptions)
      ]
    }
  );
}

export default config;
