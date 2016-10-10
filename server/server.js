/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
/* eslint-disable import/no-extraneous-dependencies*/
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import httpProxy from 'http-proxy';
import favicon from 'serve-favicon';

import { winstonLogger } from './logger';

// Express initializes app to be a function
// handler that you can supply to an HTTP server
const proxy = httpProxy.createProxyServer();
const app = express();

const outputPath = path.resolve(process.cwd(), 'build');

// view engine setup
// EJS will look for templates under the view directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Server static assets out of public: css, images
 * Express looks up the files in the order in which
 * you set the static directories with the express.static middleware
 * function
 */
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: winstonLogger.stream }));
  if (process.env.NODE_ENV === 'production') {
    // secure app
    app.use(helmet());
    app.use(express.static(outputPath));
  }
}
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));

// returns a middleware that only parses json
app.use(bodyParser.json());

// Forces the use of node's native query parser module: QueryString
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.resolve(outputPath, 'index.html'));
  } else {
    proxy.web(req, res, { target: 'http://localhost:8080' });
  }
});

// If no routes can be mapped then use the following middleware
// catch 404 and forward to error handler
app.use((request, response, next) => {
  const error = new Error('Resource not found');
  error.status = 404;

  // When you pass an Error() to next, Express.js will not jump to
  // the next route or middleware, but will instead jump to processng what is
  // know as error middleware
  next(error);
});

/* eslint-disable no-unused-vars*/
// Error Middlewares
// development error handler
// will print stack trace
// The method signature has to be (error, request, response, next) otherwise
// it will not be recognized as an error middleware. This is why we disable elint for
// no-unused-vars here
app.use((error, request, response, next) => {
  if (process.env.NODE_ENV === 'development') {
    response.status(error.status);
    response.render('error', {
      message: error.message,
      error,
    });
  } else {
    next(error);
  }
});

// Production error handler
// no stacktraces leaked to user
app.use((error, request, response, next) => {
  response.status(error.status);
  response.render('error', {
    message: error.message,
    error: {},
  });
});

// now our application is encapsulated within a node module
module.exports = app;
