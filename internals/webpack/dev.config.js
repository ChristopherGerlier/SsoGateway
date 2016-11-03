/* eslint-disable func-names*/
/* eslint-disable import/no-extraneous-dependencies*/
/* eslint-disable import/no-extraneous-dependencies*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const validate = require('webpack-validator');
const webpack = require('webpack');

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const PATHS = {
  client: path.join(__dirname, '../../client/src'),
  build: path.join(__dirname, '../../build'),
  style: path.join(__dirname, '../../public/styles', 'main.scss'),
};

console.log('Building development release...');

const config = {
  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval-source-map',

  // entry tells Webpack which are the entry points of the application
  entry: {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    client: [PATHS.client, hotMiddlewareScript],
    style: [PATHS.style, hotMiddlewareScript],
  },
  output: {
    // compile the bundles in the builds directory
    path: PATHS.build,
    // under the name [name].js
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint',
      include: PATHS.client,
    }],
    loaders: [
      { test: /\.json$/, loader: 'json' },
        // Enable caching for extra performance
      { test: /\.(js|jsx)$/,
        loaders: [
          'babel?cacheDirectory',
        ],
        include: PATHS.client,
      },
        // Files ending in .scss should invoke given loaders
        // In this case, sass-loader gets evaluated first, then
        // the css-loader then style-loader. sass-loader will resolve @import
        // and url statements in our CSS files. style-loader
        // deals with require statements in our JavaScript.
        // The style-loader takes a piece of css and injects it into the page
        // dynamically.
      { test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', // eslint-disable-line max-len
          'postcss',
          'sass?sourceMap',
        ],
        exclude: /node_modules|lib/,
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          // eslint-disable-next-line max-len
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
    ],
  },
  progress: true,
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      inject: false,
      template: 'internals/webpack/index.ejs',
      title: 'SSO Gateway',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
    new webpack.NoErrorsPlugin(),
  ],
  postcss: () => [
    // postcssAutoreset({
    //   reset: {
    //     all: 'initial',
    //     'font-family': 'inherited',
    //     'font-size': 'inherited',
    //     borderRadius: 0,
    //   },
    // }),
    // postcssInitial({
    //   reset: 'inherited',
    // }),
  ],
};

module.exports = validate(config);
