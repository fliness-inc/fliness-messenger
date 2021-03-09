module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        'semi': true,
        'singleQuote': true,
        'endOfLine': 'auto',
        'quoteProps': 'preserve',
        'arrowParens': 'always',
        'trailingComma': 'all',
      },
    ],
  },
};
