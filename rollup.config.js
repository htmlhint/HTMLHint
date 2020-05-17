import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: './src/core.js',
  output: {
    file: 'dist/htmlhint.js',
    format: 'umd',
    name: 'HTMLHint',
  },
  plugins: [commonjs(), resolve()],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser())
}

export default config
