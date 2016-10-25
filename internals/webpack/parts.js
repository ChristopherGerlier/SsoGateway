/* eslint-disable import/no-extraneous-dependencies*/
/* eslint-disable func-names*/
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const postcssAutoreset = require('postcss-autoreset');
// const postcssInitial = require('postcss-initial');

exports.devServer = function (options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      // host: options.host, // Defaults to `localhost`
      // port: options.port, // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true,
      }),
    ],
  };
};

// ***********************************************************************************
//  PRE-LOADERS
// ***********************************************************************************
exports.runESLint = function (include) {
  return {
    module: {
      preLoaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['eslint'],
        include,
      }],
    },
  };
};


// ***********************************************************************************
//  LOADERS
// ***********************************************************************************
exports.setupJSONParsing = function () {
  return {
    module: {
      loaders: [{
        test: /\.json$/,
        loaders: ['json'],
      }],
    },
  };
};

/*
  Babel runs on all our files that end with js or jsx
  (not third-party code like react)
*/
exports.setupBabel = function (include) {
  return {
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        // Enable caching for extra performance
        loader: 'react-hot!babel?cacheDirectory',
        include,
      }],
    },
  };
};

exports.configureImageLoader = function () {
  return {
    module: {
      loaders: [{
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          // eslint-disable-next-line max-len
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      }],
    },
  };
};

// this is going to inject a bunch of style tags right next to the opening body tag
// so we are not going to get a CSS file. For prod extract it.
exports.configureStyleLoaders = function () {
  return {
    module: {
      /* Loaders are small plugins that basically say “When you encounter this kind
      of file, do this with it”.
      Ultimately all loaders return strings. This allows Webpack to wrap them into
      Javascript modules
      */
      loaders: [{
        // Files ending in .scss should invoke given loaders
        // In this case, sass-loader gets evaluated first, then
        // the css-loader then style-loader. sass-loader will resolve @import
        // and url statements in our CSS files. style-loader
        // deals with require statements in our JavaScript.
        // The style-loader takes a piece of css and injects it into the page
        // dynamically.
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', // eslint-disable-line max-len
          'postcss',
          'sass?sourceMap',
        ],
        exclude: /node_modules|lib/,
      }],
    },
  };
};

/*
In production we want webpack to generate CSS files for us (as opposed
to injecting the style within a style TAG) so we can minify it, serve it
thru a CDN to cache it.

This moves every *.css in entry chunk (also called via require) into a separate
css output file. So the styles are no longed inlined into the javascript but in
a separate bundle called '[name].[hash].css'

As a result of extracting extracting the CSS files, the javascript bundle becomes slightly
smaller. We also avoid the FOUC problem. The browser does not have to wait for Javascript
to load to get styling information. Instead, it can process the CSS separately avoiding
the flash
*/
exports.extractStylesheets = function () {
  return {
    module: {
      loaders: [
        // Extract CSS during build
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
      ],
    },
    plugins: [
      // To extract the styles of all the chunks pass {allChunks: true}
      new ExtractTextPlugin('[name].[chunkhash].css', {
        allChunks: true,
      }),
      //      new ExtractTextPlugin('/app.min.css', { allChunks: true }),
    ],
  };
};

// ***********************************************************************************
//  PLUGINS
//  Plugins differ from loaders in the sense that instead of only executing on a
//  certain set of files, and being more of a “pipe”, they execute on all files
//  and perform more advanced actions, that aren’t necessarily related to transformations.
//
// ***********************************************************************************
exports.configureHTMLTemplate = function (options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        appMountId: options.appMountId,
        inject: false,
        template: 'internals/webpack/index.ejs',
        title: options.title,
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
    ],
  };
};


exports.optimize = function () {
  return {
    plugins: [
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

      // This plugin minifies all the Javascript code of the final bundle
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false, // Suppress uglification warnings
        },
      }),
    ],
  };
};

/*
  This plugins defines various variables that we can set to false
  in production to avoid code related to them from being compiled
  in our final bundle
*/
exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

/*
  CommonsChunkPlugin analyzes your chunks for recurring dependencies,
  and extracts them somewhere else.
 */
exports.extractBundle = function (options) {
  const entry = {};

  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest'],
      }),
    ],
  };
};

exports.cleanBuild = function (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd(),
      }),
    ],
  };
};

exports.configurePostCSS = function () {
  return {
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
};
