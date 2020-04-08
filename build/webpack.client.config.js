const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { baseConfig, cssRule } = require('./webpack.base.config')

const isProd = process.env.NODE_ENV === 'production'

const commonPlugins = [new VueClientPlugin()]

const devServer = {
  host: '127.0.0.1',
  port: 8080,
  hot: true,
  hotOnly: true,
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/dist-client/index.html'
  },
  proxy: {
    '/api/*': 'http://127.0.0.1:8081',
    '/user/*': 'http://127.0.0.1:8081'
  }
}

let clientConfig

if (isProd) {
  // 生产环境
  clientConfig = merge(baseConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, '../client/client-entry.js'),
    output: {
      path: path.resolve(__dirname, '../dist-client'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].thunk.[contenthash:8].js',
      publicPath: '/dist-client/'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: `[name]_[local]_[hash:base64:5]`
                    },
                    importLoaders: 2
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true
                  }
                },
                'sass-loader'
              ]
            },
            {
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true
                  }
                },
                'sass-loader'
              ]
            }
          ]
        }
      ]
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: commonPlugins.concat([
      // 提取 css
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].chunk.[contenthash:8].css'
      }),
      new OptimizeCSSAssentPlugin(), // 压缩 css
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'template.html'),
        filename: 'index.html',
        // 压缩 html
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
      })
    ])
  })
} else {
  // 开发环境
  clientConfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [cssRule]
    },
    devServer,
    plugins: commonPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'template.html'),
        filename: 'index.html'
      })
    ])
  })
}

module.exports = merge(clientConfig, {
  resolve: {
    alias: {
      api: path.resolve(__dirname, '../client/api/client-api.js')
    }
  }
})
