const path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const conCommon = require("./webpack.common.config");

const devConfig = {
  mode: 'development',
  watch: true,
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename:"[name].[chunkhash].chunk.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: [
              require("autoprefixer")
            ]
          }
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', {
          loader: "css-loader",
          options: {
            importLoaders: 3,
            modules: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            plugins: [
              require("autoprefixer")
            ]
          }
        }, {
          loader: "sass-loader"
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.join(__dirname, "src", "publish", "mixin.scss"),
              path.join(__dirname, "src", "publish", "variable.scss")
            ],
          }
        }
      ]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8880,
    open: true,
    hot: true,
    // hotOnly: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ],
  optimization: {}
}

module.exports = merge(conCommon, devConfig)