const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { baseConfig, stylusRule } = require('./webpack.base.config')

const serverConfig = merge(baseConfig, {
  target: 'node',
  mode: 'production',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist-server')
  },
  externals: Object.keys(require('../package').dependencies),
  module: {
    rules: [stylusRule]
  },
  resolve: {
    alias: {
      api: path.join(__dirname, '../client/api/server-api.js')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].chunk.[contenthash:8].css'
    }),
    new VueServerPlugin(),
    new CleanWebpackPlugin()
  ]
})

module.exports = serverConfig
