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

const isProd = process.env.NODE_ENV.trim() === 'production';

const APP_DIR = path.resolve(__dirname, './app/client/src');
const BUILD_DIR = path.resolve(__dirname, './dist');

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'prop-types',
  'redux',
  'react-redux',
  'react-md',
  'redux-observable',
  'reselect',
  'rxjs'
];

const common = merge([
  {
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    entry: {
      main: `${APP_DIR}/app.js`,
      vendor: VENDOR_LIBS
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
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
]);

module.exports = () => {
  if (isProd) {
    return merge([common, concat(), uglifyJS(), mergeChunks()]);
  }
  return merge([common, devServer(), hmr(), visualizer()]);
};
