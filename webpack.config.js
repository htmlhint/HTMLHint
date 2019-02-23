const path = require('path');

module.exports = {
  entry: './src/core.js',
  mode: 'production',
  output: {
    filename: 'htmlhint.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'HTMLHint',
    libraryTarget: 'umd',
    // See https://github.com/webpack/webpack/issues/6784
    // And https://github.com/webpack/webpack/pull/8625
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  externals: {
    jshint: {
      commonjs: 'jshint',
      commonjs2: 'jshint',
      amd: 'jshint',
      root: 'JSHINT'
    },
    csslint: {
      commonjs: 'csslint',
      commonjs2: 'csslint',
      amd: 'csslint',
      root: 'CSSLint'
    }
  }
};
