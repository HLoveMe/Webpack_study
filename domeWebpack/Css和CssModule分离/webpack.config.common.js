const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CommonWeb = {
  entry: path.join(__dirname, 'src', 'index'),
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
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "fonts/[name].[contenthash:8].[ext]"
            }
          }
        ]
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
        test: /\.css$/, //解决node_modules css
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
      "@tools": path.join(__dirname, "src", "CommonModule", "Tools"),
      "@images": path.join(__dirname, "src", "CommonModule", "Resource", "Images"),
      "@fonts": path.join(__dirname, "src", "CommonModule", "Resource", "Fonts"),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.join(__dirname, "index.html")
    })
  ]
};

function getStyleLoaders(isscss, module, prod = false) {
  return [
    {
      loader: prod ? MiniCssExtractPlugin.loader : "style-loader"
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: !isscss ? 1 : 3,
        modules: module
      }
    },
    "postcss-loader",
    ...(!isscss ? [] : [
      "sass-loader",
      {
        loader: 'sass-resources-loader',
        options: {
          resources: ['./src/CommonModule/Resource/Styles/mixins/*.scss', './src/CommonModule/Resource/Styles/variables/*.scss']
        }
      }
    ])
  ]
}
const Regexs = {
  cssRegex: /\.css$/,
  cssModuleRegex: /\.module\.css$/,
  sassRegex: /\.scss$/,
  sassModuleRegex: /\.module\.scss$/
}
module.exports.Regexs = Regexs;
module.exports.CommonWeb = CommonWeb;
module.exports.getStyleLoaders = getStyleLoaders;