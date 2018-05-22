import path from 'path'
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body',
})

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const baseConfig = {
  entry: ['babel-polyfill', PATHS.app],
  output: {
    path: PATHS.build,
    filename: 'index_bunle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.css$/,
        loader:
          'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      containers: path.resolve('./app/containers'),
      components: path.resolve('./app/components'),
      sharedStyles: path.resolve('./app/sharedStyles'),
      helpers: path.resolve('./app/helpers'),
      config: path.resolve('./app/config'),
      context: path.resolve('./app/context'),
    },
  },
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
  watch: true,
  watchOptions: {
    poll: 1000,
  },
}

const productionConfig = {
  devtool: 'cheap-module-inline-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin],
}

export default Object.assign(
  {},
  baseConfig,
  isProduction === true ? productionConfig : developmentConfig,
)
