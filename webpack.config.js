'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules', 'sass']
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  })],
  devtool: 'cheap-module-source-map'
};
