const path = require('path');
const validateConfig = require('./libs/validateConfig.js');
const queryGithub = require('./libs/queryGithub.js');
const createQuery = require('./libs/createQuery.js');
const formatData = require('./libs/formatData.js');
const renderTemplate = require('./libs/renderTemplate.js');
const log = require('./libs/log.js');

/**
 * Site Generation
 * @param {Object} config - hubble config
 * @param {String} theme - path to theme file
 * @param {String} file - path to output file
 */
const generateSite = async function generateSite(config, enrichment) {
  const template = config.source || path.join(__dirname, 'theme', 'index.ejs');
  const output = config.output || path.join('.', 'index.html');

  try {
    // Validate the config
    log('Info:', 'Validating config');
    await validateConfig(config);
    const gh = config.github;

    // Query Github
    log('Info:', 'Fetching Github data');
    const query = createQuery(gh);
    const res = await queryGithub(gh, query);

    // Format Data
    log('Info:', 'Formatting data');
    const data = formatData(res.data, config, enrichment);

    // Render Template
    log('Info:', 'Rendering data to template');
    await renderTemplate(data, template, output);

    log('Success:', `Rendered Hubble template for ${gh.username} at ${output}`, true);
  } catch (err) {
    log('Error:', 'Uh Oh... Somethings gone wrong:');
    throw err;
  }
};

module.exports = {
  queryGithub,
  generateSite
};
