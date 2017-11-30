const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const template = path.join(__dirname, 'dist', 'template.html')
const app = path.join(__dirname, 'dist', 'index.js')
const outputPath = path.join(__dirname, 'public')

module.exports = {
  entry: { app: app },
  output: { path: outputPath, filename: '[name].pack.js' },
  plugins: [ new HtmlWebpackPlugin({ hash: true, template: template }) ],
  devServer: { inline: true, open: true }
}
