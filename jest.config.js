module.exports = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text'],
  collectCoverageFrom: ['src/**/*.ts'],
  preset: 'ts-jest/presets/js-with-babel',
  testTimeout: 30000,
}
