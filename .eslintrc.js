module.exports = {
  extends: 'erb',
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  },
  rules: {
    'no-eval':
      ['error', { allowIndirect: true }]
  }
}
