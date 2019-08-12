var path = require('path');
module.exports = {
  entry: path.join(__dirname,"src","app.js"),
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env", {
                useBuiltIns: "usage",
                "corejs": 2,
              }
            ],
            [
              '@babel/preset-react'
            ]
          ],
        }
      }, {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024 * 20,
            outputPath: "images/",
            name: "[name]_[hash].[ext]"
          }
        }
      }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  }
}