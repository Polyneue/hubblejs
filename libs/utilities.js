// Deps
const chalk = require('chalk');
const timestamp = require('time-stamp');

// Libs
const validateConfig = require('./schema.js');
const getUserData = require('./getUserData.js');
const getProjectData = require('./getProjectData.js');


/**
 * Formats for standard error message
 * @param {String} label - Label for the error
 * @param {String} error - Error to report
 * @return {String} return formatted error message
 * @private
 */
const reportError = function reportError(label, error) {
  const time = timestamp('[HH:mm:ss]');
  return `${time} ${chalk.red('Error')} ${chalk.yellow(label)} ${error}`;
};

module.exports = {
  validateConfig,
  getUserData,
  getProjectData,
  reportError
};
