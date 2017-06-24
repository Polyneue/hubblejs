const utils = require('./libs/utilities.js');

const log = console.log; // eslint-disable-line

/**
 * Construct Hubble - validate and assign
 * @param {Object} config - configuration object for Hubble
 */
const Hubble = function hubble(config) {
  // Validate the config
  // TODO: Move this into it's own function for validating.
  const errors = utils.validateConfig(config);
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      log(utils.reportError('Config', `${errors[i].path} is invalid`));
    }
    throw Error('Config Error, See above.');
  } else {
    this.config = Object.freeze(config);
  }

  // DEBUG
  console.log('CONFIG:');
  console.dir(this.config); // eslint-disable-line
};

// Hubble.prototype.createDirectories = function createDirectories() {
//   // Create Project Directories
// };

// Hubble.prototype.getData = function getData() {
//   // Get Github Data
// };

// Hubble.prototype.renderTemplates = function renderTemplates() {
//   // Run Templating Engine
// };

// Hubble.prototype.generateSite = function generateSite() {
//   // Create Project Directories
//   // Get Github Data
//   // Run Templating Engine
//   // Done!
// };

module.exports = Hubble;
