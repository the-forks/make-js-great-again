const AutoDllPlugin = require('autodll-webpack-plugin');
const vendors = require('../vendors');

module.exports = () => ({
  plugins: [
    new AutoDllPlugin({
      debug: true,
      inject: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: vendors
      }
    })
  ]
});
