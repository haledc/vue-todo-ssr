const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  // 生成vue-ssr-client-manifest.json
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

if (isDev) {
  // 开发环境
  clientConfig = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
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
      new webpack.NoEmitOnErrorsPlugin(),
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
      })
    ])
  })
} else {
  // 生产环境
  clientConfig = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      // 指定的第三方块入口
      vendor: ['vue', 'vue-router', 'vuex']
    },
    output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      publicPath: '/client-dist/'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          // 提取css
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
    plugins: defaultPlugins.concat([
      new UglifyJsWebpackPlugin(),
      // 提取css
      new ExtractPlugin('static/css/styles.[contentHash:8].css'),
      // 分离第三方块
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 分离运行块
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      // 使用块名称代替数字, 需要在路由中配置注释
      new webpack.NamedChunksPlugin(),
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html'),
        filename: 'index.html',
        // 压缩html
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
      })
    ])
  })
}

clientConfig = merge(clientConfig, {
  resolve: {
    alias: {
      'api': path.join(__dirname, '../client/api/client-api.js')
    }
  }
})

module.exports = clientConfig
