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

console.log('Building development release...');

const config = merge({
  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval-source-map',

  // entry tells Webpack which are the entry points of the application
  entry: {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    client: PATHS.client,
    style: PATHS.style,
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
  // Watching doesn't work too well on Docker Toolbox for Windows. Adding polling'
  watchOptions: {
    poll: 1000,
  },
},
parts.configureHTMLTemplate({
  title: 'WebStudio Docs',
  appMountId: 'app',
}),
parts.setupJSONParsing(),
parts.setupBabel(PATHS.client),
parts.runESLint(PATHS.client),
parts.configureStyleLoaders(PATHS.stylesheets),
parts.configurePostCSS(),
parts.configureImageLoader(),
parts.devServer({
  // Customize host/port here if needed
  host: process.env.HOST,
  port: process.env.PORT,
})
);

module.exports = validate(config);
