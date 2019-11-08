const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  entry: path.resolve(__dirname, '../client/client-entry.js'),
  output: {
    path: path.resolve(__dirname, '../dist-client'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].thunk.[hash:8].js',
    publicPath: 'http://127.0.0.1:8080/dist-client/'
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
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false // 删除多余空格
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(git|png|jpe?g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[hash:8].[ext]',
          outputPath: 'media/'
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}

const cssRule = {
  test: /\.(scss|css)$/,
  oneOf: [
    {
      resourceQuery: /module/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
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
        'vue-style-loader',
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

module.exports = { baseConfig, cssRule }
