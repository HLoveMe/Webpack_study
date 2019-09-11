const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var merge = require('webpack-merge');
const CommonWebP = require("./webpack.config.common")
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ProWebP = {
  mode: 'production',
  performance: {
    hints: false
  },
  output: {
    path: path.join(__dirname, "prod"),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // modules: true
            }
          },
          "postcss-loader"
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 3,
              // modules: true
            }
          },
          "postcss-loader",
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/public/styles/mixins/*.scss', './src/public/styles/variables/*.scss']
            }
          }
        ]
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    runtimeChunk: {
      name:entrypoint => `runtime~${entrypoint.name}`
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {//分割文件 都要经过组 
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "js/[name].bundle.js",
          name: "vendors"
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 0,
          // filename: "js/[name].bundle.js",
          name: "react"
        },
        antd_mobile: {
          test: /[\\/]node_modules[\\/](antd-mobile)/,
          priority: 0,
          filename: "js/[name].bundle.js",
          name: "antd_mobile"
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          // filename: "js/[name].bundle.js",
          name: "common"
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[id].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      chunks: ["index","react","antd_mobile","vendors","runtime~index"],
      // excludeChunks:[],
      filename: `app.html`,
      template: path.join(__dirname, "index.html"),
    }),
    new HtmlWebpackPlugin({
      chunks:["cbd","react","antd_mobile","vendors","runtime~cbd"],
      // excludeChunks:["vendors","react","antd_mobile","runtime"],
      filename: `cbd.html`,
      template: path.join(__dirname, "index.html"),
    })
  ],
};

module.exports = merge(CommonWebP, ProWebP)