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
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  }
};
