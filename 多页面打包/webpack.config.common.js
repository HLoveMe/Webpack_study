const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CommonWeb = {
  entry: {
    index: path.join(__dirname, 'src', 'index'),
    cbd: path.join(__dirname, 'src', 'index')
  },
  module: {
    rules: [
      {
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
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', {
                "useBuiltIns": "usage",
                "corejs": 2,
                "targets": {
                  "browsers": ["last 2 versions", "safari 7"]
                }
              }],
              ["@babel/preset-react"],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['import', { libraryName: 'antd-mobile', style: "css" }],
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ]
          }

        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: false,
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      "@": path.join(__dirname, "src"),
      tools: path.join(__dirname, "src", "Tools")
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};

// CommonWeb.plugins = CommonWeb.plugins.concat(MakePlgins(CommonWeb.entry))

module.exports = CommonWeb;