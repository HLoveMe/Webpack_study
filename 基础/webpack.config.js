const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: path.join(__dirname,"src",'index.js'),
  watch: true,
  output: {
    path: path.join(__dirname,"dist"),
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 1024 * 20,
          outputPath: "images/",
          name: "[name]_[hash].[ext]"
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules:true
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
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname,"dist"),
    compress: true,
    port: 8880,
    open: true,
    hot:true,
    hotOnly:true
  }
};