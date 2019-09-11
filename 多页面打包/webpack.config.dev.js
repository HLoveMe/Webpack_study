const path = require('path');
var merge = require('webpack-merge');
const CommonWebP = require("./webpack.config.common")
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const DevWebP = {
  mode: 'development',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: '[name].[hash:4].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
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
        "style-loader",
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
  devtool: 'eval-source-map',
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true,
    port: 8286,
    open: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.join(__dirname, "index.html"),
    })
  ]
};

module.exports = merge(CommonWebP, DevWebP)