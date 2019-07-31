const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssentPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isProd = process.env.NODE_ENV === 'production'

const defaultPlugins = [
  // 生成 vue-ssr-client-manifest.json
  new VueClientPlugin()
]

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/client-dist/index.html'
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
      vendor: ['vue', 'vue-router', 'vuex'] // 指定的第三方块入口
    },
    output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      publicPath: '/client-dist/'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
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
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
      })
    ])
  })
}

clientConfig = merge(clientConfig, {
  resolve: {
    alias: {
      api: path.join(__dirname, '../client/api/client-api.js')
    }
  }
})

module.exports = clientConfig
