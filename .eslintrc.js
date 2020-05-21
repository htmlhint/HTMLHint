module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
    mocha: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-body-style': ['error'],
    'no-template-curly-in-string': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'off',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'prefer-const': 'error',
    'prefer-template': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off', // TODO: turn this into error after typescript migration

    // TODO: remove following disabled rules and use recommended
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
