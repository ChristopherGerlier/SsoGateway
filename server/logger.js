/* eslint-disable no-console */

import chalk from 'chalk';
import ip from 'ip';
import winston from 'winston';

const divider = chalk.gray('\n-----------------------------------');

export const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

winstonLogger.stream = {
  write: (message) =>
    winstonLogger.info(message),
};

/**
 * Logger middleware, you can customize it to make messages more personal
 */
export const chalkLogger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port) => {
    console.log(`Server started ${chalk.green('✓')}`);
    console.log(`
      ${chalk.bold('Access URLs:')}${divider}
      Localhost: ${chalk.magenta(`http://localhost:${port}`)}
            LAN: ${chalk.magenta(`http://${ip.address()}:${port} \n`)}${divider}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};
