const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const serverConfig = merge(baseConfig, {
  target: 'node', // 目标
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // commonjs 模块
    filename: 'server-bundle.js',
    path: path.join(__dirname, '../server-dist')
  },
  externals: Object.keys(require('../package').dependencies), // 外置化模块，提高服务器构建速度
  resolve: {
    alias: {
      api: path.join(__dirname, '../client/api/server-api.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
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
