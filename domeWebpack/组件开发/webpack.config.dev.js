const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "dist", "index.js"),
  output: {
    path: path.join(__dirname, "cjs"),
    filename: 'pin.cjs.dev.js',
    library: 'Pin',// 
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['ts-loader']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components|build)/,
      use: {
        loader: "babel-loader",
      },
    },]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
  },
  externals: [
    "rxjs",
    'rxjs/operators',
    "vue",
    "vue-router",
  ],
  devtool: 'cheap-module-source-map',
};