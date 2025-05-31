import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import { version } from './package.json'

const getDate = () => {
  const date = new Date()
  return date.toISOString().split('T')[0] // Returns date in YYYY-MM-DD format
}

const banner = `/*!
 * HTMLHint v${version}
 * https://htmlhint.com
 * Built on: ${getDate()}
 * Copyright (c) ${new Date().getFullYear()} HTMLHint
 * Licensed under MIT License
 */`

export default {
  input: './dist/core/core.js',
  output: {
    file:
      process.env.NODE_ENV === 'production'
        ? 'dist/htmlhint.min.js'
        : 'dist/htmlhint.js',
    format: 'umd',
    name: 'HTMLHint',
    banner,
  },
  plugins: [
    commonjs(),
    resolve(),
    ...(process.env.NODE_ENV === 'production'
      ? [
          terser({
            format: {
              comments: /^!/,
            },
          }),
        ]
      : []),
  ],
}
