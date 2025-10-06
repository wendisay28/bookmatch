const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@components': path.resolve(__dirname, 'src/components'),
  })
);
