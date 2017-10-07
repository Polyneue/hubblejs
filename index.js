const validateConfig = require('./libs/validateConfig.js');
const queryGithub = require('./libs/queryGithub.js');
const createQuery = require('./libs/createQuery.js');
const renderTemplate = require('./libs/renderTemplate.js');
const log = require('./libs/log.js');

/**
 * Site Generation
 * @param {Object} config - hubble config
 * @param {String} theme - path to theme file
 * @param {String} file - path to output file
 */
const generateSite = async function generateSite(config, theme, file) {
  const template = theme || `${__dirname}/node_modules/hubblejs-default-theme/index.html`;
  const output = file || './index.html';

  try {
    // Validate the config
    log('', 'Validating config...');
    await validateConfig(config);
    const gh = config.github;

    // Query Github
    log('', 'Fetching Github data...');
    const query = createQuery(gh);
    const res = await queryGithub(gh, query);

    // Render Template
    log('', 'Rendering data to template');
    if (config.meta) res.data.meta = config.meta;
    await renderTemplate(res.data, template, output);

    log('Success:', `Rendered Hubble template for ${gh.username} at ${output}`, true);
  } catch (err) {
    log('Error:', err.stack, true);
  }
};

module.exports = {
  queryGithub,
  generateSite
};
