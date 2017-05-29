const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourceFolder = path.resolve(__dirname, '../src');
const outputFolder = path.resolve(__dirname, '../dist');
const templateIndex = path.resolve(__dirname, '../src/index.html');

module.exports = {
  devtool: 'eval',
  entry: [
    '../../../reax',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    sourceFolder
  ],
  output: {
    path: outputFolder,
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject : true,
      template : templateIndex
    })
  ],
  resolve: {
    // modules: [
    //   path.resolve(__dirname, '../../../'),
    //   'node_modules'
    // ],
    modulesDirectories: [
      '../../../reax',
      'node_modules'
    ],
    extensions: [ '', '.js' ],
    // alias: {
    //   reax: path.resolve(__dirname, '../../../')
    // }
  },
  module: {
    // rules: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //       options
    //     }
    //   }
    // ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
};
