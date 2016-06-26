'use strict';
const path = require('path');
const webpack = require('webpack');
const plugins = [];

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'bundles'),
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
  plugins
};

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}
else {
  module.exports.devtool = 'cheap-module-source-map';
}
