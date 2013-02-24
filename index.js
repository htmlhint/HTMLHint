module.exports = process.env.COV
  ? require('./lib-cov/htmlhint')
  : require('./lib/htmlhint');