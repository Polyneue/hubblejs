const chalk = require('chalk');

/**
 * Log a message out to the console.
 * @param {String} type - message type
 * @param {Object} message - message
 */
const log = function log(type, message) {
  const msg = [
    chalk.yellow('[Hubble.js]'),
    (type !== 'Error') ? chalk.green(`${type}:`) : chalk.red(`${type}:`),
    `${message}`
  ];
  console.log(msg.join(' ')); // eslint-disable-line
};

module.exports = log;
