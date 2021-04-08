module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    browser: true,
    node: true,
    // mocha: true,
    jest: true,
    // jquery: true
  },
  plugins: ['prettier'],
  globals: {
    NodeJS: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'max-params': 'off',
    // Customize your rules
  },
};
