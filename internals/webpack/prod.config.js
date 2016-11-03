/* eslint-disable func-names*/
/* eslint-disable import/no-extraneous-dependencies*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const validate = require('webpack-validator');

// const postcssAutoreset = require('postcss-autoreset');
// const postcssInitial = require('postcss-initial');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  client: path.join(__dirname, '../../client/src'),
  build: path.join(__dirname, '../../build'),
  style: path.join(__dirname, '../../public/styles', 'main.scss'),
};

process.env.BABEL_ENV = TARGET;

console.log('Building production release...');

const config = {
  devtool: 'eval-source-map',
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    // we push application code and style as separate entry chunks
    // This breaks the dependency and fixed caching
    client: PATHS.client,
    style: PATHS.style,
    vendor: ['react', 'react-dom', 'redux'],
  },
  output: {
    path: PATHS.build,
    // if the file content related to a chunk are different, the hash will change
    // as well, thus invalidating the cache.
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
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
      { test: /\.(js|jsx)$/, loader: 'react-hot!babel?cacheDirectory', include: PATHS.client },
      {
        test: /\.scss$/,
        // extract takes 2 arguments:
        //  - first is what to do with the extracted contents when we are in a chunk ('style')
        //  - second is what to do when we're in the ,ain file ('css!sass')
        //  Now if we’re in a chunk, we can’t just magically append our CSS to the generated
        //  one so we use the style loader here as before, but for all the styles that are
        //  found in the main file, pipe them to a builds/[name].[chunkhash].css file.
        loader: ExtractTextPlugin.extract('style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss'), // eslint-disable-line max-len
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
    // To extract the styles of all the chunks pass {allChunks: true}
    new ExtractTextPlugin('[name].[chunkhash].css', {
      allChunks: true,
    }),
    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // Extract bundle and manifest files. Manifest is
    // needed for reliable caching.
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
      },
    }),
    new CleanWebpackPlugin([PATHS.build], {
      // Without `root` CleanWebpackPlugin won't point to our
      // project and will fail to work.
      root: process.cwd(),
    }),
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
