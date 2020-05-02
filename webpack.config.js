const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const getEntryPage = entryName => resolve(__dirname, 'src/pages/', entryName, 'index.js')
const getEntryTemplate = entryName => resolve(__dirname, 'src/templates/', entryName, 'index.html')

const entry = {
  home: getEntryPage('home'),
  auth: getEntryPage('auth'),
  overview: getEntryPage('overview'),
  agents: getEntryPage('agents')
}

const entryHtmlPlugins = Object.keys(entry).map(entryName =>
  new HtmlWebpackPlugin({
    filename: entryName === 'home' ? 'index.html' : entryName + '/index.html',
    template: getEntryTemplate(entryName),
    chunks: [entryName]
  })
)

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: entry,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: isProduction ? 'webpack/[name]-[chunkhash].js' : 'webpack/[name].js'
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist/'),
    port: 8000,
    publicPath: '/',
    hotOnly: true,
    proxy: {
      '/api': 'http://127.0.0.1:3000'
    }
  },
  plugins: [
    new CopyPlugin(['public']),
    !isProduction && new HotModuleReplacementPlugin()
  ].filter(Boolean).concat(entryHtmlPlugins),
  optimization: isProduction ? {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: { warnings: false, output: { comments: false } }
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  } : {}
}
