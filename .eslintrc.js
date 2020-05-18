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
    'no-template-curly-in-string': 'error',
    'no-useless-concat': 'error',
    'one-var': ['error', 'never'],
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
  },
}
