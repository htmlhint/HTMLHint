import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default {
  input: './dist/core/core.js',
  output: {
    file:
      process.env.NODE_ENV === 'production'
        ? 'dist/htmlhint.min.js'
        : 'dist/htmlhint.js',
    format: 'umd',
    name: 'HTMLHint',
  },
  plugins: [
    commonjs(),
    resolve(),
    ...(process.env.NODE_ENV === 'production' ? [terser()] : []),
  ],
}
