const webpack = require('webpack');
const path = require('path');

const DIST = path.resolve(__dirname, 'dist');
const CLIENT = path.resolve(__dirname, 'client');

module.exports = {
  entry: CLIENT,
  output: {
    path: DIST,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
