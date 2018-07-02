const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path')

const baseConfig = require('./webpack.base.config')

const serverConfig = merge(baseConfig, {
  target: 'node',
  entry: {
    path: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../server-dist'),
    filename: 'server-bundle.js'
  },
  externals: Object.keys(require('../package').dependencies),
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[id]-[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new VueSSRServerPlugin()
  ]
})

module.exports = serverConfig
