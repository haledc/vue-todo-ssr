const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const { baseConfig, stylusRule } = require('./webpack.base.config')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const isProd = process.env.NODE_ENV === 'production'

const serverConfig = merge(baseConfig, {
  target: 'node',
  mode: isProd ? 'production' : 'development',
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
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[id]-[contenthash:8].css'
    }),
    new VueServerPlugin()
  ]
})

module.exports = serverConfig
