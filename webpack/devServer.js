module.exports = () => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    compress: true,
    hot: true,
    port: 8000,
    overlay: {
      warnings: true,
      errors: true
    }
  }
});
