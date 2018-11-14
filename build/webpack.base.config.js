const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = {
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../client-dist'),
    publicPath: 'http://127.0.0.1:8080/client-dist/'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 先处理
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = baseConfig
