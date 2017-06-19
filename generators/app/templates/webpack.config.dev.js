const path = require('path');

const openBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    './src/app.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
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
    new openBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html'
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: './'
  }
};