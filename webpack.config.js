const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJS = require('./webpack/plugins/uglify');
const concat = require('./webpack/plugins/concat');
const mergeChunks = require('./webpack/plugins/mergeChunks');
const hmr = require('./webpack/plugins/hmr');
const devServer = require('./webpack/devServer');
const visualizer = require('./webpack/plugins/visualizer');
const compileTime = require('./webpack/plugins/compile-time');
const autoDllPlugin = require('./webpack/plugins/autodll');
const commonChunkPlugin = require('./webpack/plugins/commons-chunk');
const vendors = require('./webpack/vendors');

const isProd =
  !!process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production';

const APP_DIR = path.resolve(__dirname, './app/client/src');
const BUILD_DIR = path.resolve(__dirname, './dist');

const common = merge([
  {
    devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
    entry: {
      main: `${APP_DIR}/app.js`
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: {
          collapseWhitespace: true
        },
        hash: true,
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
]);

const useVendorSplitting = merge([
  {
    entry: {
      vendor: vendors
    }
  }
]);

module.exports = () => {
  if (isProd) {
    return merge([
      common,
      useVendorSplitting,
      commonChunkPlugin(),
      concat(),
      uglifyJS(),
      mergeChunks()
    ]);
  }
  return merge([
    common,
    devServer(),
    hmr(),
    visualizer(),
    compileTime(),
    autoDllPlugin()
  ]);
};
