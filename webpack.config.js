const path = require('path');
const webpack = require('webpack');

const sourceFolder = path.resolve(__dirname, './src');
const outputFolder = path.resolve(__dirname, './build');

module.exports = {
  entry: [ sourceFolder ],
  output: {
    path: outputFolder,
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ]
      }
    ]
  }
};
