const path = require('path');
var merge = require('webpack-merge');
const webpack = require("webpack");
const Common = require("./webpack.config.common");
const CommonWebP = Common.CommonWeb
const getStyleLoaders = Common.getStyleLoaders


const cssRegex = Common.Regexs.cssRegex;
const cssModuleRegex = Common.Regexs.cssModuleRegex;
const sassRegex = Common.Regexs.sassRegex;
const sassModuleRegex = Common.Regexs.sassModuleRegex;
console.log(111111111,path.resolve(__dirname,"src"))
const DevWebP = {
  mode: 'development',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: '[name].[hash:4].js'
  },
  module: {
    rules: [
      {
        include:path.resolve(__dirname,"src"),
        oneOf: [
          {
            test: sassModuleRegex,
            use: getStyleLoaders(true, true, false)
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders(false, true, false)
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders(false, false, false)
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(true, false, false),
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
    inline: true,
    // historyApiFallback:true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(CommonWebP, DevWebP)
