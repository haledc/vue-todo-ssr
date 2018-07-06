const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const serverConfig = merge(baseConfig, {
  // 目标
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    // commonjs模块
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js',
    path: path.join(__dirname, '../server-dist')
  },
  // 外置化模块，提高服务器构建速度
  externals: Object.keys(require('../package').dependencies),
  resolve: {
    alias: {
      'api': path.join(__dirname, '../client/api/server-api.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = serverConfig
