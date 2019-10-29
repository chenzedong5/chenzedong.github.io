const {
  override,
  addLessLoader,
  fixBabelImports
} = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);