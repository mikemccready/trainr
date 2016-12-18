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
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
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
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass?sourceMap&config=sassLoader'
        ]
      }
    ]
  }
};
