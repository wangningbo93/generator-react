const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const CleanPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'app')
  },
  output: {
    path:path.resolve(__dirname,"dist"),
    publicPath: "http://img.58cdn.com.cn/zhuanzhuan/ec/static/",
    filename: "[name].[hash].js"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }, {
      test: /\.js|\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ["es2015", "react"]
      }
    },]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss','jpg'],
  },
  plugins: [
    new CleanPlugin("dist"),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html'
    }),
    new WebpackMd5Hash(),
    new ExtractTextPlugin({
      filename:'[name].[hash].css',
      disable: false,
      allChunks: false
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: './'
  }
};