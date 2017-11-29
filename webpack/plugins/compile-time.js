const CompileTimePlugin = require('webpack-compile-time-plugin');

module.exports = () => ({
  plugins: [new CompileTimePlugin()]
});
