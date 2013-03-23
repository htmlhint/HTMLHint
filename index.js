module.exports = process.env.HTMLHINT_COV
  ? require('./lib-cov/htmlhint')
  : require('./lib/htmlhint');
