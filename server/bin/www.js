// The bin directory serve as a location where one can define
// the various startup script.. The www is one.
// Having bin/www is a convention from the Express community.
// by extracting the application from the actual code that binds the
// application to the network, we can require our server.js from our tests

/**
 * Module dependencies
 */
import http from 'http';
import config from 'config';
import { chalkLogger, winstonLogger } from '../logger.js';
import server from '../server.js';

const httpServer = http.Server(server);

/**
 * Get port from environment and store in Express
 */
const port = process.env.PORT || config.server.port;
const host = process.env.HOST || config.server.host;
server.set('port', port);
server.set('host', host);

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
});
