const path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const conCommon = require("./webpack.common.config");

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[contenthash].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "index.html")
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].chunk.css',
    }),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
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
        {
          loader: MiniCssExtractPlugin.loader
        }, {
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
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {//分割文件 都要经过组 
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        // react: {
        //   test: /[\\/]node_modules[\\/](react)/,
        //   priority: 0
        // },
        // react_dom: {
        //   test: /[\\/]node_modules[\\/](react-dom)/,
        //   priority: 0
        // },
        // rxjs: {
        //   test: /[\\/]node_modules[\\/](rxjs)/,
        //   priority: 0
        // },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }

module.exports = merge(conCommon, prodConfig)