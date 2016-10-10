/* eslint-disable func-names*/
/* eslint-disable import/no-extraneous-dependencies*/
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./parts');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  client: path.join(__dirname, '../../client/src'),
  build: path.join(__dirname, '../../build'),
  style: path.join(__dirname, '../../public/styles', 'main.scss'),
};

process.env.BABEL_ENV = TARGET;

console.log('Building production release...');

const config = merge({
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    // we push application code and style as separate entry chunks
    // This breaks the dependency and fixed caching
    client: PATHS.client,
    style: PATHS.style,
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
},
parts.configureHTMLTemplate({
  title: 'WebStudio Docs',
  appMountId: 'app',
}),
parts.setupJSONParsing(),
parts.setupBabel([PATHS.client]),
parts.runESLint([PATHS.client]),
parts.cleanBuild(PATHS.build),
parts.setFreeVariable(
  'process.env.NODE_ENV',
  'production'
),
parts.extractBundle({
  name: 'vendor',
  entries: ['react', 'react-dom', 'redux'],
}),
parts.optimize(),
parts.configureImageLoader(),
parts.configurePostCSS(),
parts.extractStylesheets(PATHS.stylesheets)
);

module.exports = validate(config);
