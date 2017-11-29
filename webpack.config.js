const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const template = './app/template.html'
const app = './app/index.js'
const outputPath = path.join(__dirname, '/public')

module.exports = {
  entry: {
    app: app
  },
  output: {
    path: outputPath,
    filename: '[name].pack.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: template
    })
  ],
  devServer: {
    inline: true,
    open: true
  }
}
