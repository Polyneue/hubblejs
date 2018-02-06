const chalk = require('chalk');

/**
 * Log a message out to the console.
 * @param {String} type - message type
 * @param {Object} message - message
 * @param {Bool} newline - add a new line after message
 */
const log = function log(type, message, newline) {
  let highlight = chalk.blue;
  if (type === 'Error:') highlight = chalk.red;
  if (type === 'Success:') highlight = chalk.green;

  const msg = [
    chalk.yellow('[Hubble.js]'),
    highlight(type),
    `${message}`
  ];

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(msg.join(' '));

  if (newline) process.stdout.write('\n');
};

module.exports = log;
