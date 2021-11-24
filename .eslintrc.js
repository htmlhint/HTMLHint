module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        project: './tsconfig.lint.json',
        warnOnUnsupportedTypeScriptVersion: false,
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
        'template-curly-spacing': 'error',
        'template-tag-spacing': 'error',
        quotes: ['error', 'single', { avoidEscape: true }],

        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
    {
      files: ['**/*.spec.js'],
      env: {
        mocha: true,
      },
    },
  ],
}
