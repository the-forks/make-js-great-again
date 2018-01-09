const webpack = require('webpack');

module.exports = () => ({
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      children: true,
      async: 'common',
      minChunks: 3
    })
  ]
});
