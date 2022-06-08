const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    'index': path.join(__dirname, "dist", 'web', 'index.js')
  },
  output: {
    path: path.join(__dirname, "dist", 'web2'),
    library: 'Flow',// 
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
        options: {
          "plugins": [
            ["@babel/plugin-proposal-optional-chaining"],
          ],
          presets: [
            [
              "@babel/preset-env", {
                // 要兼容的目标浏览器
                targets: {
                  chrome: '74',
                  firefox: '60',
                  ie: '11',
                  safari: '10',
                  edge: '17'
                },
                // 指定corejs版本
                "corejs": "3",
                // 使用corejs的方式  usage表示按需加载
                "useBuiltIns": "usage"
              }
            ]
          ]
        }
      },
    },]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
  },
  externals:{
    // axios:'axios',
    // rxjs:'rxjs'
  },
  devtool: 'cheap-module-source-map',
};