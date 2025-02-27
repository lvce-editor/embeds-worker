import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import pluginTypeScript from '@babel/preset-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: 'src/embedsWorkerMain.ts',
  preserveEntrySignatures: 'strict',
  treeshake: {
    propertyReadSideEffects: false,
  },
  external: ['ws', 'electron'],
  output: {
    file: 'dist/dist/embedsWorkerMain.js',
    format: 'es',
    freeze: false,
    generatedCode: {
      constBindings: true,
      objectShorthand: true,
    },
    sourcemap: false,
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [pluginTypeScript],
    }),
    nodeResolve(),
  ],
}

export default options
