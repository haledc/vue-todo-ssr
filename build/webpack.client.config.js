const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const { baseConfig, stylusRule } = require('./webpack.base.config')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isProd = process.env.NODE_ENV === 'production'

const defaultPlugins = [new VueClientPlugin()]

const devServer = {
  host: '127.0.0.1',
  port: 8080,
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/dist-client/index.html'
  },
  hot: true,
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
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue', 'vue-router', 'vuex']
    },
    output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      publicPath: '/dist-client/'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:8]'
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true
                  }
                },
                'stylus-loader'
              ]
            },
            {
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
    plugins: defaultPlugins.concat([
      // 提取 css
      new MiniCssExtractPlugin({
        filename: 'static/css/[name]-[contenthash:8].css',
        chunkFilename: 'static/css/[id]-[contenthash:8].css'
      }),
      new OptimizeCSSAssentPlugin(), // 压缩 css
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html'),
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
      rules: [stylusRule]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
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
