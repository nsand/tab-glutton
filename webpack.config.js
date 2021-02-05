'use strict';
const path = require('path');
const webpack = require('webpack');
const plugins = [];

module.exports = {
  entry: {
    index: './src/index.jsx',
    options: './src/options/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'bundles'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  plugins,
  optimization: {
    minimize: true
  },
  mode: 'production'
};

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }));
}
else {
  module.exports.devtool = 'cheap-module-source-map';
}
