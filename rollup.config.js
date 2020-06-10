import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import visualizer from 'rollup-plugin-visualizer';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

/**
 * @param {string} mode
 */
const config = (mode) => ({
  input: './src/lib/index.ts',
  output: [
    {
      file: `dist/statex${mode === 'production' ? '' : '.dev'}.cjs.js`,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: `dist/statex${mode === 'production' ? '' : '.dev'}.esm.js`,
      format: 'esm',
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    external(),
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
    babel({
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
      ],
      babelHelpers: 'bundled',
    }),
    resolve(),
    commonjs(),
    visualizer(),
    cleanup({ extensions: ['ts', 'tsx'] }),
    mode === 'production' && terser(),
  ],
});

export default [config('test'), config('production')];
