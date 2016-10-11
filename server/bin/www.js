/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */

// The bin directory serve as a location where one can define
// the various startup script.. The www is one.
// Having bin/www is a convention from the Express community.
// by extracting the application from the actual code that binds the
// application to the network, we can require our server.js from our tests

/**
 * Module dependencies
 */
import http from 'http';
import minimist from 'minimist';
import { chalkLogger, winstonLogger } from '../logger.js';
import server from '../server.js';

const httpServer = http.Server(server);
const argv = minimist(process.argv.slice(2));

/**
 * Normalize a port into a number, string or false
 */
function normalizePort(value) {
  const portNumber = parseInt(value, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return value;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  return false;
}

/**
 * Get port from environment and store in Express
 */
const port = normalizePort(argv.port || process.env.PORT || 3000);
server.set('port', port);
server.set('host', 'localhost');

/**
 * Event listener for HTTP server "error" event
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friend messages
  switch (error.code) {
    case 'EACCES':
      chalkLogger.error(`${bind} requires elevated priviledges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      chalkLogger.error(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

/**
 * Listen on provided port, on all network interfaces
 * Backend server that don't render views start at 8000
 * Backend server that render views start at 3000
 */
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', () => {
  chalkLogger.appStarted(port);
  winstonLogger.level = 'debug';
  winstonLogger.info(`Listening on port ${port}!`);
//  console.log(`Listening on port ${port}!`);
});
