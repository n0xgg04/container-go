module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'react-hooks', '@tanstack/query', 'unused-imports'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'unused-imports/no-unused-imports': 'warn',
  },
};
