const validateConfig = require('./libs/validateConfig.js');
const queryGithub = require('./libs/queryGithub.js');
const createQuery = require('./libs/createQuery.js');
const renderTemplate = require('./libs/renderTemplate.js');

const log = console.log; // eslint-disable-line

/**
 * Construct Hubble - validate and assign
 * @param {Object} config - configuration object for Hubble
 * @return self
 */
// TODO: We don't need the Hubble instance in order to generate a site...
const Hubble = function hubble(config) {
  // Validate the config
  validateConfig(config);

  // If the config is valid add it to Hubble
  this.config = Object.freeze(config);

  log('======== INITIALIZE CONFIG ======== \n', this.config);

  return this;
};

/**
 * Generates and renders the Hubble site with Github data.
 * @public
 */
Hubble.prototype.generateSite = async function generateSite() {
  // Validate the site first
  const config = this.config.github;

  try {
    const query = await createQuery(config);
    const ghData = await queryGithub(config, query);
    log('======== TEMPLATE DATA ======== \n'); // DEBUG
    console.dir(ghData);

    // TODO: handle when the config has a custom theme path
    renderTemplate(ghData.data, `${__dirname}/libs/template.html`);
  } catch (err) {
    throw err;
  }
};

// Logical Steps
// 1. Validate the config that hubble receives
// 2. Get the github data based on config
// 3. Transform that data into the format best suited for templating
// 4. Generate template with data

module.exports = Hubble;
