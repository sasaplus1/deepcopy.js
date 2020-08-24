import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

import meta from './package.json';

const config = [];

const aliasOptions = {
  // NOTE: use ES Module version
  entries: [{ find: 'type-detect', replacement: 'type-detect/index' }]
};

if (process.env.build === 'esm') {
  config.push({
    input: './index.ts',
    output: {
      file: './dist/esm/index.mjs',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      alias(aliasOptions),
      nodeResolve(),
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
    target: 'ES2017'
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
      plugins: [
        alias(aliasOptions),
        nodeResolve(),
        typescript({ ...typescriptOptions, target: 'ES5' })
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
        alias(aliasOptions),
        nodeResolve(),
        typescript({ ...typescriptOptions, sourceMap: false, target: 'ES5' }),
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
      plugins: [
        alias(aliasOptions),
        nodeResolve(),
        typescript(typescriptOptions)
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
        alias(aliasOptions),
        nodeResolve(),
        typescript({ ...typescriptOptions, sourceMap: false }),
        terser(terserOptions)
      ]
    }
  );
}

export default config;
