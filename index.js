const path = require('path');
const validateConfig = require('./libs/validateConfig.js');
const queryGithub = require('./libs/queryGithub.js');
const formatData = require('./libs/formatData.js');
const renderTemplate = require('./libs/renderTemplate.js');

const log = console.log; // eslint-disable-line

/**
 * Instantiate a new Hubble instance and assign the config
 * @param {Object} config - Hubble configuration
 */
const Hubble = function (config) {
  // Validate username and token
  this.config = validateConfig(config);

  // Assign output if none exists
  if (!this.config.output) {
    this.config.output = path.join('.', 'dist', 'index.html');
  }

  // Assign theme if none exists
  if (!this.config.theme) {
    this.config.theme = {};
  }
};

/**
 * Generate the site with data from Hubble instance
 * @param {Function} template - a render function
 */
Hubble.prototype.generate = async function (template) {
  const { output, username, theme, token, repositories, records } = this.config;

  // Begin generating the site
  log('[ Hubble.js ]');

  try {
    // Query Github
    let data = await queryGithub(username, token, records);
    log('[1/3] \u2713 retrieved Github data');

    // Format Data
    data = formatData(data, { username, repositories, theme });
    log('[2/3] \u2713 formatted data');

    // Render Template
    await renderTemplate(data, template, output);
    log('[3/3] \u2713 rendered template');

    log(`Successfully rendered Hubble template for ${username} at ${output}`);
  } catch (err) {
    log('Something went wrong: \n');
    throw err;
  }
};

module.exports = Hubble;
