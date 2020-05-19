module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    amd: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'arrow-body-style': ['error'],
    'no-template-curly-in-string': 'error',
    'no-useless-concat': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'prefer-template': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
  },
}
