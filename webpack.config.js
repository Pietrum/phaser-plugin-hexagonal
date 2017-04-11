const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const Webpack = {
  devtool: debug ? 'inline-source-map' : false,
  entry: './src/Hexagonal.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          comments: false,
          presets: ['es2015', 'stage-0'],
        },
      }, {
        loader: 'eslint-loader',
      }],
    }],
  },
  output: {
    filename: 'phaser-plugin-hexagonal.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // globals
    new CleanWebpackPlugin('dist'),
  ].concat(debug ? [
    // development only
  ] : [
    // production only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]),
};

module.exports = Webpack;
