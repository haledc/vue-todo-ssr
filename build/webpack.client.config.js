const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const baseConfig = require('./webpack.base.config')

const isProd = process.env.NODE_ENV === 'production'
let clientConfig

const commonModule = {
  rules: [
    {
      test: /\.styl(us)?$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
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
}

const commonPlugins = [
  new VueSSRClientPlugin()
]

const devServer = {
  inline: true,
  hot: true,
  host: '0.0.0.0',
  port: 8080,
  overlay: {
    errors: true
  },
  // headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    rewrites: [{
      from: /.*/g,
      to: path.posix.join('/', 'index.html')
    }]
  }
}

if (isProd) {
  clientConfig = merge(baseConfig, {
    mode: process.env.NODE_ENV || 'production',
    output: {
      filename: 'static/js/[name]-[chunkhash:8].js'
    },
    module: {
      ...commonModule
    },
    optimization: {
      // 分割块
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: commonPlugins.concat([
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'template.html'),
        filename: 'index.html',
        inject: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name]-[contenthash:8].css',
        chunkFilename: 'static/css/[id]-[contenthash:8].css'
      }),
      new OptimizeCssAssetsWebpackPlugin(),
      new CleanWebpackPlugin(
        [path.join(__dirname, '../dist/')],
        {
          root: path.join(__dirname, '../')
        }
      )
    ])
  })
} else {
  clientConfig = merge(baseConfig, {
    mode: process.env.NODE_ENV || 'development',
    module: {
      ...commonModule
    },
    devServer,
    plugins: commonPlugins.concat([
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'template.html'),
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ])
  })
}

module.exports = clientConfig
