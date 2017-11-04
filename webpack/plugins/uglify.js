const webpack = require('webpack');

module.exports = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_console: true
      },
      output: { comments: false }
    })
  ]
});
