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
  this.config = validateConfig(config);
};

/**
 * Generate the site with data from Hubble instance
 * @param {Function} template - a render function
 */
Hubble.prototype.generate = async function (template) {
  // Grab information off of the Config
  const theme = this.config.theme || {};
  const repositories = this.config.repositories || [];
  const output = this.config.output || path.join('.', 'dist', 'index.html');
  const { username, token } = this.config;

  // Begin generating the site
  log('[ Hubble.js ]');

  try {
    // Query Github
    const res = await queryGithub(username, token);
    log('[1/3] \u2713 retrieved Github data');

    // Format Data
    const data = formatData(res.data, { username, repositories, theme });
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
